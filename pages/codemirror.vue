<template>
  <client-only>
    <div class="">
      <el-row :gutter="12">
        <el-col :span="12">
          <div
            class="text-3xl tool-bar border-slate-300 bg-white dark:bg-slate-700 flex h-auto divide-x divide-slate-300 dark:divide-slate-600"
          >
            <Icon name="radix-icons:font-bold" @click="toggleBold(view)"></Icon>
            <Icon
              name="radix-icons:font-italic"
              @click="toggleItalic(view)"
            ></Icon>
            <Icon
              name="mingcute:code-fill"
              style="padding: 5px"
              @click="setCodeBlock(view)"
            ></Icon>
            <Icon
              name="octicon:link-16"
              style="padding: 6px"
              @click="setLink(view)"
            ></Icon>
            <Icon
              name="ph:image-bold"
              style="padding: 6px"
              @click="setImage(view)"
            ></Icon>
            <Icon
              name="pajamas:quote"
              style="padding: 6px"
              @click="setQuote(view)"
            ></Icon>
            <Icon
              name="clarity:number-list-line"
              @click="setNumberList(view)"
            ></Icon>
            <Icon name="ion:list" @click="setGenericList(view)"></Icon>
            <Icon name="jam:header-1" @click="setH1(view)"></Icon>
            <Icon name="jam:header-2" @click="setH2(view)"></Icon>
            <Icon name="jam:header-3" @click="setH3(view)"></Icon>
            <!-- <el-button @click="toggleCode('***')">Ttalic</el-button>
          <el-button @click="toggleCode('')">Code </el-button>
          <el-button @click="toggleCode2('[', '](http://)')">Link </el-button>
          <el-button @click="toggleCode2('![', '](http://)')">Image </el-button>
          <el-button @click="insertBefore('>')">Quote </el-button>
          <el-button @click="insertBefore('1.')">Number List </el-button>
          <el-button @click="insertBefore('-')">Generic List </el-button>
          <el-button @click="insertBefore('#')">Header 1 </el-button>
          <el-button @click="insertBefore('##')">Header 2</el-button>
          <el-button @click="insertBefore('###')">Header 3</el-button> -->
          </div>
          <codemirror
            v-model="code"
            ref="$codemirror"
            placeholder="Code goes here..."
            :style="{ height: 'calc(100vh - 130px)' }"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="extensions"
            @ready="handleReady"
            @change="log('change', $event)"
            @focus="log('focus', $event)"
            @blur="log('blur', $event)"
          />
        </el-col>
        <el-col :span="12">
          <el-scrollbar :style="{ height: 'calc(100vh - 100px)' }">
            <article
              id="markdown-content"
              class="dark:bg-slate-900 prose prose-stone shadow-lg p-4 w-full prose-img:rounded-xl dark:prose-invert prose-a:text-blue-600 prose-pre:p-0 prose-h1:my-1 prose-h2:my-1 prose-h3:my-1 max-w-full prose-code:before:contents prose-code:after:contents prose-code:bg-red-100 prose-code:text-red-600 prose-code:py-1 prose-code:px-2 prose-code:rounded-lg"
            ></article>
          </el-scrollbar>
        </el-col>
      </el-row>
    </div>
  </client-only>
</template>
<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
// import { javascript } from '@codemirror/lang-javascript'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
import { Text, EditorSelection, EditorState } from '@codemirror/state'
import { EditorView } from 'codemirror'
useHead({
  link: [],
  script: []
})

const { $marked } = useNuxtApp()
const {
  keymaps,
  toggleBold,
  toggleItalic,
  setH1,
  setH2,
  setH3,
  setImage,
  setLink,
  setGenericList,
  setNumberList,
  setQuote,
  setCodeBlock
} = useMarkdown()
const eventHandlders = EditorView.domEventHandlers({
  scroll(event: Event, view: any) {
    // console.log(event, view)
  }
})
const extensions = [keymaps, markdown(), oneDark, eventHandlders]
const code = ref(
  `# Marked in browser\n## H2 \n### H3\n\nRendered by **marked**.\n\n` +
    '```javascript ' +
    '\n' +
    'let num = 1; ' +
    '\n' +
    'function add(){ ' +
    '\n' +
    'num++; ' +
    '\n' +
    '} ' +
    '\n' +
    '``` ' +
    '\n' +
    '`Tag Name`\n' +
    '| Header | Header2 | Header3 | \n' +
    '|--|--|--|  \n' +
    '| xxx | xxx2 |xxx3 | \n'
)

// Codemirror EditorView instance ref
const view = shallowRef()
const handleReady = (payload) => {
  view.value = payload.view
}
const $codemirror = ref(null)

// Status is available at all times via Codemirror EditorView
const getCodemirrorStates = () => {
  const state = view.value.state
  const ranges = state.selection.ranges
  const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
  const cursor = ranges[0].anchor
  const length = state.doc.length
  const lines = state.doc.lines
  // more state info ...
  // return ...
}

const log = (a: string) => {
  if (a == 'change') {
    // html.value = marked.parse(code)
    setTimeout(() => {
      $marked
        .parse(
          code.value.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, '')
        )
        .then((el: string) => {
          document.getElementById('markdown-content')!.innerHTML = el
        })
    }, 0)
  }
}
const renderer = {
  name: 'descriptionList',
  level: 'block',
  start(src) {
    return true
  }, // Hint to Marked.js to stop and check for a match
  tokenizer(src, tokens) {
    const rule = /^(?::[^:\n]+:[^:\n]*(?:\n|$))+/ // Regex for the complete token, anchor to string start
    const match = rule.exec(src)
    if (match) {
      const token = {
        // Token to generate
        type: 'descriptionList', // Should match "name" above
        raw: match[0], // Text to consume from the source
        text: match[0].trim(), // Additional custom properties
        tokens: [] // Array where child inline tokens will be generated
      }
      this.lexer.inline(token.text, token.tokens) // Queue this data to be processed for inline tokens
      return token
    }
  },
  heading(token) {
    console.log(token)
    // return `<h${level}>
    //     ${text}
    //   </h${level}>`
  },
  paragraph(token) {
    console.log(token)
  }
}

onMounted(() => {
  $marked.use({
    // extensions: [renderer]
  })
  $marked
    .parse(code.value.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ''))
    .then((el: string) => {
      document.getElementById('markdown-content')!.innerHTML = el
    })
})
</script>

<style lang="postcss" scoped>
.tool-bar {
  svg {
    @apply p-1 cursor-pointer;
  }
}
</style>