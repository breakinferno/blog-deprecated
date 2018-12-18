<template>
  <div class="blog-panel">
    <Container @drop="onDrop">
      <Draggable v-for="item in items"
                 :key="item.id">
        <div class="draggable-item">
          {{item.data}}
        </div>
      </Draggable>
    </Container>
  </div>
</template>
<script>
import { Container, Draggable } from 'vue-smooth-dnd'
const generateItems = (count, creator) => {
  const result = []
  for (let i = 0; i < count; i++) {
    result.push(creator(i))
  }
  return result
}

const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) return arr

  const result = [...arr]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }

  return result
}
export default {
  name: 'Simple',
  components: { Container, Draggable },
  data () {
    return {
      items: generateItems(10, i => ({ id: i, data: 'Draggable ' + i }))
    }
  },
  methods: {
    onDrop (dropResult) {
      this.items = applyDrag(this.items, dropResult)
    }
  }
}
</script>
