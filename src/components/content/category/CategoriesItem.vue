<template>
  <div class="category-item" v-if="Object.keys(categoryData).length !== 0">
    <div class="item" v-for="(item, index) in categoryData.list" :key="index">
      <img :src="item.image" @load="imgLoad" />
      <p class="item-title">{{item.title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoriesItem',
  props: {
    categoryData: {
      type: Object,
      default: {},
    },
  },
  methods: {
    imgLoad() {
      this.$emit('categoryItemLoad');
    },
  },
};
</script>

<style scoped>
.item {
  display: inline-block;
  height: 110px;
  width: calc(100% / 3);
  text-align: center;
  margin-bottom: 15px;
}
.item img {
  height: 80%;
  width: 100%;
  vertical-align: middle;
}
.item-title {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
}
</style>