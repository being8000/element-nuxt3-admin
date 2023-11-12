<template>
  <div>
    <h1 class="text-2xl font-semibold capitalize">use-motion</h1>
    <p class="underline text-blue-500">
      https://motion.vueuse.org/api/use-motion
    </p>
    <el-card class="flex">
      <div>
        <section class="w-[500px]">
          <div class="flex">
            <section class="capitalize mr-3">opacity:</section>
            <section class="w-full">
              <el-slider
                v-model="motionProperties.opacity"
                :min="0"
                :max="1"
                :step="0.01"
              />
            </section>
          </div>
        </section>
        <section class="w-[500px]">
          <div class="flex">
            <section class="capitalize mr-3">width:</section>
            <section class="w-full">
              <el-slider
                v-model="motionProperties.width"
                :min="0"
                :max="100"
                :step="1"
              />
            </section>
          </div>
        </section>
        <section class="w-[500px]">
          <div class="flex">
            <section class="capitalize mr-3">rotate:</section>
            <section class="w-full">
              <el-slider
                v-model="motionProperties.rotate"
                :min="0"
                :max="100"
                @change="changeRotate"
                :step="1"
              />
            </section>
          </div>
        </section>
      </div>
      <div ref="target" class="h-10 w-10 bg-slate-600"></div>
    </el-card>
    <section class="py-3 flex space-x-4">
      <div
        v-motion
        :initial="{
          scale: 1
        }"
        :enter="{
          scale: 2,
          transition: {
            type: 'spring',
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: 1000
          }
        }"
        class="h-10 w-10 bg-slate-600"
      ></div>
    </section>
    <section class="py-3 flex space-x-4">
      <div
        v-motion
        :initial="{
          y: 100,
          opacity: 0
        }"
        :enter="{
          y: 0,
          opacity: 1,
          transition: {
            repeat: Infinity,
            type: 'spring',
            stiffness: 250,
            damping: 25,
            mass: 0.5,
            repeatDelay: 1000
          }
        }"
        class="h-10 w-10 bg-slate-600"
      ></div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { useMotion, Variant, useMotionProperties, MotionVariants } from '@vueuse/motion'

const target = ref<HTMLElement>()

const initial = ref<Variant>({
  opacity: 1,

})
const variants = ref<MotionVariants>({
  initial: initial.value,
  // enter: {
  //   opacity: 1
  // },
  leave: {
    opacity: 0
  }
})

const motionInstance = useMotion(target, variants)
const { motionProperties } = useMotionProperties(target)
const changeRotate = (value: number) => {
  console.log(value)
  motionProperties.transform = `rotate(${motionProperties.rotate}deg)`
}
</script>