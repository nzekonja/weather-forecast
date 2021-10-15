<template>
  <div>
    <SyncLoader v-if="loading" />
    <vSelect
      v-else
      :placeholder="citySelectPlaceHolder"
      :options="options"
      :value="`${selected.name} / ${selected.sys.country} `"
      class="select-countries"
      @input="onChange"
    />
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import SelectHelper from "@/utils/helpers/selectHelper";
import vSelect from "vue-select";
import {
  countriesFromOpenWeatherAPI,
  citySelectPlaceHolder,
} from "@/utils/constants";
import { mapActions, mapGetters, mapState } from "vuex";
import SyncLoader from "vue-spinner/src/SyncLoader.vue";
const arrayOfCountries = SelectHelper.parseCountriesToCountriesForSelect(
  countriesFromOpenWeatherAPI
);

const onChange = function (event) {
  const id = event.value;

  this.$store.dispatch("changeSelected", id);
  if (this.$store.getters.selected.id) this.$store.dispatch("getForecast");
};

@Component({
  components: { vSelect, SyncLoader },
  methods: { ...mapActions(["changeSelected"]), onChange },
  computed: { ...mapGetters(["selected", "loading"]) },
})
export default class CitySelector extends Vue {
  data() {
    return {
      options: arrayOfCountries,
      citySelectPlaceHolder,
    };
  }
}
</script>
