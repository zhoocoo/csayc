<template>
  <div class="dropdown-end dropdown">
    <label tabindex="0" class="btn-ghost btn">
      <slot></slot>
      <svg
        class="fill-current"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
      </svg>
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu menu-compact w-40 bg-base-100 shadow-lg"
    >
      <li
        v-for="item in props.list"
        :key="item[props.valueKey || 'value']"
        :class="{ bordered: active === item[props.valueKey || 'value'] }"
        @click="setActive(item)"
      >
        <a>{{ item[props.labelKey || 'label'] }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
interface IListPropsItem {
  value: string | number
  label: string
  [key: string]: any
}

interface IProps {
  modelValue?: string | number | null
  list: IListPropsItem[]
  valueKey?: string
  labelKey?: string
}

const emits = defineEmits(['update:modelValue', 'change'])

const props = defineProps<IProps>()
//     {
//   list: {
//     type: Array,
//     default() {
//       return [] as IListPropsItem[]
//     }
//   },
//   modelValue: {
//     type: [String, Number],
//     default: null
//   }
// }

const active = useVModel(props, 'modelValue', emits)

const setActive = (item: IListPropsItem) => {
  active.value = item[props.valueKey || 'value']
  emits('change', item)
}
</script>
