<template>
  <ComAffixPanel offset-top="4rem">
    <div
      ref="rightPanel"
      class="not-prose flex h-screen w-80 flex-col items-center px-3 pt-4"
    >
      <div
        class="bg-base card card-compact w-full rounded-none border-0 shadow-none md:border md:border-base-200 md:shadow"
      >
        <div class="card-body bg-base-100">
          <ArticleTocAnchor></ArticleTocAnchor>
          <slot> </slot>
        </div>
      </div>
    </div>
  </ComAffixPanel>
</template>
