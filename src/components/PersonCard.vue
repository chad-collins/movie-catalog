<template>
  <div>
    <router-link
      :to="{ 
            name: 'person', 
            params: { 
                id: person.id,
                person: person
            } 
        }"
    >
      <img
        class="person-headshot"
        :src="person.profile_path | formatImageLink"
        :alt="'Photo of ' + person.name"
      />
    </router-link>
    <p class="person-name">{{ person.name }}</p>
    <small v-if="person.character">{{ person.character }}</small>
    <small v-if="person.job">{{ person.job }}</small>
  </div>
</template>

<script>
export default {
  props: { person: Object }
};
</script>

<style>
.person {
  height: auto;
  width: auto;
  margin: 1rem;
}

.person-headshot {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
}
</style>