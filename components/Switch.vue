<!-- Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent -->
<template>
  <div>
    <div
      ref="containerRef"
      class="relative inline-flex transition-colors"
      :class="classNames(props.slotClass, currentItem?.activeSlotClass, props.disabled ? (props.disabledClass ?? 'cursor-not-allowed opacity-50') : '')"
      :style="{
        background: currentItem?.activeSlotColor || props.slotColor,
        padding: `${padding.y}px ${padding.x}px`,
      }"
    >
      <div
        ref="thumbRef"
        class="absolute"
        :class="[
          !props.disabled && 'cursor-pointer',
          props.thumbClass,
          currentItem?.activeThumbClass,
          isInitialized ? 'opacity-100' : 'opacity-0',
          { 'transition-all duration-300 ease-cubic-1': isInitialized },
        ]"
        :style="{
          left: thumbPos.left + 'px',
          width: thumbPos.width + 'px',
          top: `${thumbPos.top}px`,
          height: `${thumbPos.height}px`,
          background: currentItem?.activeThumbColor || props.thumbColor,
          ...currentItem.activeThumbStyle,
        }"
        @click="onSelect(currentItemIdx)"
      />
      <component
        :is="props.itemTag"
        v-for="(item, idx) in items"
        :key="item.key"
        ref="itemRef"
        class="relative z-10 text-xs leading-normal transition-colors"
        :class="[
          !props.disabled && 'cursor-pointer',
          currentValue !== item.key ? inactiveItemClass || 'text-fg-02-light hover:text-fg-01-light dark:text-fg-02-dark dark:hover:text-fg-01-dark' : '',
          currentValue === item.key ? activeItemClass : '',
          idx === currentItemIdx && 'pointer-events-none',
          itemClass,
        ]"
        :style="{
          minWidth,
          minHeight,
          marginRight: idx < items.length - 1 ? `${props.itemGap}px` : '0',
        }"
        @click="onSelect(idx)"
      >
        <slot
          name="label"
          :item="item"
          :active="idx === currentItemIdx"
        >
          <component
            :is="item.label"
            v-if="isComponent(item.label)"
          />
          <template v-else>
            {{ item.label ?? item.name }}
          </template>
        </slot>
      </component>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends unknown, Key extends string | boolean, Item extends SwitchItem<T, Key>">
import { useElementBounding } from '@vueuse/core'
import { computed, type CSSProperties, nextTick, onMounted, reactive, ref, type UnwrapRef, type VNode, watch } from 'vue'

import { debounce } from '@/utils/debounce'
import { classNames } from '@/utils/vue/utils'

export interface SwitchItem<T = unknown, Key extends string | boolean = string> {
  name?: string
  label?: string | VNode | (() => VNode)
  value?: T
  key: Key
  activeSlotColor?: string
  activeThumbColor?: string
  activeSlotClass?: string
  activeThumbClass?: string
  thumbColor?: string
  activeThumbStyle?: CSSProperties
}

type ComponentLike = VNode | (() => VNode)

const props = withDefaults(
  defineProps<{
    modelValue?: Key
    selectMode?: 'select' | 'loop'
    items: readonly Item[]
    size?: number | [number, number]
    padding?: number | [number, number]
    slotColor?: string
    slotClass?: string
    activeItemClass?: string
    inactiveItemClass?: string
    itemClass?: string
    thumbColor?: string
    thumbClass?: string
    onSelect?(item: SwitchItem<Item['value'], Key>, oldItem?: SwitchItem<Item['value'], Key>): Promise<boolean | undefined> | boolean | undefined
    disabled?: boolean
    disabledClass?: string
    itemGap?: number
    itemTag?: string
  }>(),
  {
    padding: 3,
    itemGap: 0,
    itemTag: 'div',
  },
)

const emit = defineEmits<{
  (ev: 'update:modelValue', v: Key): void
  (ev: 'select', item: SwitchItem<T, Key>, oldItem?: SwitchItem<T, Key>): void
}>()

const isComponent = (v?: string | ComponentLike): v is ComponentLike => typeof v === 'function' || typeof v === 'object'

const minWidth = computed(() => {
  if (!props.size) {
    return '0px'
  }
  else if (typeof props.size === 'number') {
    return `${props.size}px`
  }
  else {
    return `${props.size[0]}px`
  }
})

const minHeight = computed(() => {
  if (!props.size) {
    return '0px'
  }
  else if (typeof props.size === 'number') {
    return `${props.size}px`
  }
  else {
    return `${props.size[1]}px`
  }
})

const padding = computed(() => {
  if (Array.isArray(props.padding)) {
    return { x: props.padding[0], y: props.padding[1] }
  }
  else {
    return { x: props.padding, y: props.padding }
  }
})

const containerRef = ref<HTMLDivElement>()
const itemRef = ref<HTMLDivElement[]>()
const thumbRef = ref<HTMLDivElement>()
const isInitialized = ref(false)

const containerBounding = useElementBounding(containerRef)

const _value = ref(props.modelValue || props.items[0]?.key)
const currentValue = computed({
  get() {
    return props.modelValue ?? (_value.value as Key)
  },
  set(v: Key) {
    _value.value = v as UnwrapRef<Key>
    emit('update:modelValue', v)
  },
})

const currentItemIdx = computed(() => {
  const idx = props.items.findIndex((item) => item.key === currentValue.value)
  return idx > -1 ? idx : 0
})
const currentItem = computed(() => props.items[currentItemIdx.value])

const thumbPos = reactive({ left: 0, width: 0, top: 0, height: 0 })

watch(currentItemIdx, (idx) => {
  updateThumbPos(idx)
})

watch([containerBounding.width, containerBounding.height], () => {
  debounceUpdateThumbPos()
})

const updateThumbPos = async (idx: number) => {
  const el = itemRef.value?.[idx]
  if (el) {
    thumbPos.left = el.offsetLeft
    thumbPos.width = el.offsetWidth
    thumbPos.top = el.offsetTop
    thumbPos.height = el.offsetHeight
  }
  await nextTick()
  if (thumbPos.width !== 0 || thumbPos.height !== 0) {
    if (!isInitialized.value) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      thumbRef.value?.offsetLeft
      isInitialized.value = true
    }
  }
  else {
    isInitialized.value = false
  }
}

const debounceUpdateThumbPos = debounce(() => updateThumbPos(currentItemIdx.value), 100)

onMounted(async () => {
  await nextTick()
  updateThumbPos(currentItemIdx.value)
})

const onSelect = async (idx: number) => {
  if (props.disabled) return
  if (props.selectMode === 'loop') {
    idx = (currentItemIdx.value + 1) % props.items.length
  }
  const nextItem = props.items[idx]
  const r = await props.onSelect?.(nextItem, currentItem.value)
  if (r === false) return
  updateThumbPos(idx)
  currentValue.value = nextItem.key
}
</script>
