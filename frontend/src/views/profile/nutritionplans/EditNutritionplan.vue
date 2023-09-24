<template>
  <div class="view-edit-nutritionplan" content>
    <div max-width>
      <h3>Редактирование плана питания</h3>
      <FHNutritionplanForm v-if="plan" :existingPlan="plan" />
    </div>
  </div>
</template>

<script lang="ts">
import FHNutritionplanForm from '@/components/forms/FHNutritionplanForm.vue';
import backend from '@/utils/backend';
import { closeFullscreen } from '@/utils/functions';
import { INutritionplan } from '@/utils/interfaces';
import { NotificationManagement } from '@/utils/NotificationManagement';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    FHNutritionplanForm
  }
})
export default class EditNutritionplan extends Vue {
  public plan: INutritionplan | null = null;

  mounted() {
    const id = this.$route.params.id;
    if (!id) {
      this.notFound();
      return;
    }

    backend
      .get('nutritionplan/' + id)
      .then(res => {
        if (!res.data) {
          this.notFound();
          return;
        }
        this.plan = res.data;
      })
      .catch(this.notFound);
  }

  public notFound(): void {
    NotificationManagement.sendNotification(
      'Планы питания',
      'Указанный план питания найти не удалось.'
    );
    closeFullscreen('nutritionplans');
  }
}
</script>

<style lang="scss" scoped>
.view-edit-nutritionplan {
  padding-top: 0;
}
</style>
