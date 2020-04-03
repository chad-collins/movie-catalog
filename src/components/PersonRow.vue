<template>
  <div id="people-row">
    <h3 class="row-title">{{ rowTitle }}</h3>
    <div class="flex" >
      <PersonCard class="person-card" v-for="person in people" :key="person.id" :person="person" />
    </div>
  </div>
</template>


<script>
import PersonCard from "./PersonCard";
export default {
  name: "peopleRow",
  components: { PersonCard },
  props: {
    rowTitle: String,
    people: Array,
  }
};
</script>


<style scoped>
.row-title {
  padding: 0 5px 18px 5px;
}

.flex {
  display: flex;
  padding: 0 5px 15px 5px;
  overflow-y: hidden; /* Hide horizontal scrollbar */
  overflow-x: scroll; /* Add vertical scrollbar */
}

.person-card {
  margin: 0 1rem;
}

.person-card:first-child {
  margin: 0 1rem 0 0;
}
</style>