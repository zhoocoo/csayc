<template>
  <div class="dropdown-end dropdown">
    <label tabindex="0" class="btn btn-ghost" @click="setActive(data)">
      <span>{{ data[labelKey] || $slots.default }}</span>
      <svg
        v-if="props.data.children"
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
      v-if="props.data.children"
      tabindex="0"
      class="dropdown-content menu menu-compact w-40 bg-base-100 shadow-lg"
    >
      <li
        v-for="item in props.data.children"
        :key="item[valueKey]"
        :class="{
          bordered: active === item[valueKey] || $route.path === item[valueKey]
        }"
        @click="setActive(item)"
      >
        <a>{{ item[labelKey] }}</a>
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
  data: {
    label: string
    value: number | string
    [key: string]: any
    children?: IListPropsItem[]
  }
  valueKey?: string
  labelKey?: string
}

const valueKey = computed(() => {
  return props.valueKey || 'value'
})

const labelKey = computed(() => {
  return props.labelKey || 'label'
})

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
  if (item.children) {
    return
  }
  active.value = item[props.valueKey || 'value']
  emits('change', item)
}
</script>
