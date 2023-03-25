<template>
  <div class="max-height">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Сумма</th>
          <th>Дата</th>
          <th>Категория</th>
          <th>Тип</th>
          <th>Открыть</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(r, idx) of paginatedRec" :key="r.id">
          <td>{{ idx + 1 }}</td>
          <td>{{ r.amount }}</td>
          <td>{{ r.filterDate }}</td>
          <td>{{ r.categoryName }}</td>
          <td>
            <span
              class="white-text badge"
              :class="[r.typeClass]"
            >{{ r.typeText }}
            </span>
          </td>
          <td>
            <button
              class="btn-small btn"
              @click="$router.push('/DetailRecord/' + r.id)"
            >
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="">
    <div class="crm-pagination">
      <div class="crm-page"
        v-for="p in pages"
          :key="p"
          :class="{'crm-page_selected' :p === state.pageNumber}"
          @click="nextPage(p)"
        >
          {{p}}
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
export default {
  setup (props) {
    const state = reactive({
      pageNumber: 1,
      perPage: 4
    })
    const pages = computed(() => { return Math.ceil(props.recordArr.length / 4) })
    const paginatedRec = computed(() => {
      const from = (state.pageNumber - 1) * state.perPage
      const to = from + state.perPage
      return props.recordArr.slice(from, to)
    })
    function nextPage (page) {
      state.pageNumber = page
    }
    return { state, pages, paginatedRec, nextPage }
  },
  computed: {},
  props: {
    recordArr: {
      type: Array
    }
  }
}
</script>
