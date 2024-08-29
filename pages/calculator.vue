<!-- pages / calculator.vue -->
<script setup lang="ts">
import { useApiStore } from '~/stores/api'
import { showLoading, hideLoading } from '~/stores/eventBus'

const apiStore = useApiStore()
const foodList = ref([])

const mode = ref(1)
/**
 * 選擇模式
 * 0 鮮食隨機配
 * 1 指定鮮食算攝取量
 * 2 指定熱量算鮮食
 * 3 指定飼料算攝取量
 * 4 指定熱量算飼料
 */

const weight = ref('') // 體重
const activity = ref('low') // low, medium, high
const foodId = ref('') // 食物 ID

const calculatefoodInfo: any = ref('') // 指定鮮食算攝取量

onMounted(() => {
  fetchFoods()
})

// 取得食物列表
async function fetchFoods() {
  try {
    showLoading()
    const res = await apiStore.fetchFoodList()
    const result = res.data

    console.log(result)

    if (result && result.status === 'success') {
      foodList.value = result.data
      console.log(foodList.value)
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// 新增鮮食計算
async function submitCalculatefood() {
  try {
    showLoading()
    const res = await apiStore.calculateFood({
      weight: weight.value,
      activity: activity.value,
      foodId: foodId.value
    })
    const result = res.data

    console.log(result)

    if (result && result.status === 'success') {
      calculatefoodInfo.value = result.data
      console.log('新增成功')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}
</script>

<template>
  <div class="w-full">
    <!-- * tab -->
    <div class="flex-wrapper">
      <div class="flex overflow-x-auto">
        <div
          class="calculator-tab"
          :class="{ 'calculator-tab-active': mode === 0 }"
          @click="mode = 0"
        >
          鮮食隨機配
        </div>
        <div
          class="calculator-tab"
          :class="{ 'calculator-tab-active': mode === 1 }"
          @click="mode = 1"
        >
          指定鮮食算攝取量
        </div>
        <div
          class="calculator-tab"
          :class="{ 'calculator-tab-active': mode === 2 }"
          @click="mode = 2"
        >
          指定熱量算鮮食
        </div>
        <div
          class="calculator-tab"
          :class="{ 'calculator-tab-active': mode === 3 }"
          @click="mode = 3"
        >
          指定飼料算攝取量
        </div>
        <div
          class="calculator-tab"
          :class="{ 'calculator-tab-active': mode === 4 }"
          @click="mode = 4"
        >
          指定熱量算飼料
        </div>
      </div>
    </div>

    <!-- * content -->
    <div class="cus-border">
      <!-- * introduction -->
      <div class="cus-intro">
        不知道該給鸚鵡吃什麼嗎？<br />
        輸入鸚鵡體重跟活動水平，我幫你推薦營養均衡的鮮食！
      </div>
      <hr class="cus-line-row" />

      <!-- * page > mode -->
      <!-- ? 0 鮮食隨機配 -->
      <section v-if="mode === 0" class="">
        <div class="cus-block-padding">鮮食隨機配</div>
      </section>

      <!-- ? 1 指定鮮食算攝取量 -->
      <section v-else-if="mode === 1">
        <!-- >> 1 指定鮮食算攝取量 info -->
        <div class="cus-block-padding">
          <h2 class="cus-page-title">輸入基本資料</h2>

          <div class="cus-col-3">
            <div class="cus-col-1">
              <label for="weight" class="cus-label"
                >1. 體重 (g) <span class="text-red2">*</span></label
              >
              <input
                type="number"
                class="cus-input"
                id="weight"
                v-model="weight"
                placeholder="請輸入鸚鵡體重 (g)"
              />
              <span class="cus-input-note">基礎代謝率(BMR) = 175 * (體重 / 1000) ^ 0.75</span>
            </div>

            <div class="cus-col-1">
              <label for="activity" class="cus-label"
                >2. 活動水平 <span class="text-red2">*</span></label
              >
              <div class="cus-radio-row">
                <label class="cus-label-radio" for="low">
                  <input
                    type="radio"
                    name="activity"
                    class=""
                    id="low"
                    v-model="activity"
                    value="low"
                  />
                  <span></span>
                  低 - 平常不太活動
                </label>

                <label class="cus-label-radio" for="medium">
                  <input
                    type="radio"
                    name="activity"
                    class=""
                    id="medium"
                    v-model="activity"
                    value="medium"
                  />
                  <span></span>
                  中 - 適度活動
                </label>

                <label for="high" class="cus-label-radio">
                  <input
                    type="radio"
                    name="activity"
                    class=""
                    id="high"
                    v-model="activity"
                    value="high"
                  />
                  <span></span>高 - 經常活動
                </label>
              </div>
              <span class="cus-input-note">活動水平用來調整 BMR，可以更符合需求</span>
            </div>

            <div class="cus-col-1" v-if="foodList.length">
              <label for="foodId" class="cus-label"
                >3. 選擇想計算的食物 <span class="text-red2">*</span></label
              >
              <select type="number" class="cus-input" id="foodId" v-model="foodId">
                <option value="" disabled selected>請選擇食物</option>
                <option v-for="food in foodList" :key="food._id" :value="food._id">
                  {{ food.name }}
                </option>
              </select>
              <span class="cus-input-note">目前僅提供計算資料庫內的食物</span>
            </div>
          </div>

          <button
            class="cus-btn-primary mt-5"
            :disabled="!weight || !foodId"
            @click="submitCalculatefood"
          >
            開始計算
          </button>
        </div>

        <!-- >> 1 result > md -->
        <div v-if="calculatefoodInfo" class="lg:hidden">
          <hr class="cus-line-row" />
          <div class="cus-block-padding">
            <h2 class="cus-page-title">計算結果</h2>

            <!-- ? 每日基本營養需求 -->
            <h3 class="cus-title-border-left">每日基本營養需求</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">熱量 (kcal/day)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.dailyCalories }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">蛋白質 (g/day)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.dailyProteinNeed }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">脂肪 (g/day)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.dailyFatNeed }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="cus-table-th">碳水化合物 (g/day)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.dailyCarbsNeed }}</div>
              </div>
            </div>

            <!-- ? 食物營養資訊 -->
            <h3 class="cus-title-border-left">食物營養資訊</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">食物名稱</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.name }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">熱量 (kcal/100g)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.calories }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">蛋白質 (g/100g)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.protein }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">脂肪 (g/100g)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.fat }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">碳水化合物 (g/100g)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.carbs }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">每日最大攝取量 (g/day)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.maxIntake }}</div>
              </div>
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">食物備註</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.note }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="cus-table-th">好處</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.nutrition }}</div>
              </div>
            </div>

            <!-- ? 食物建議攝取量 & 營養資訊 -->
            <h3 class="cus-title-border-left">食物建議攝取量 & 營養資訊</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">建議攝取量 (g/day)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.foodIntake }}</div>
              </div>

              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">蛋白質量 (g/day)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.nutrientsProvided?.protein }}</div>
              </div>

              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">脂肪量 (g/day)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.nutrientsProvided?.fat }}</div>
              </div>

              <div class="grid grid-cols-2">
                <div class="cus-table-th">碳水化合物量 (g/day)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.nutrientsProvided?.carbs }}</div>
              </div>

              <div class="cus-table-row grid grid-cols-2">
                <div class="cus-table-th">提供總熱量 (kcal/day)</div>
                <div class="cus-table-td">{{ calculatefoodInfo.foodProvidedCalories }}</div>
              </div>
            </div>

            <!-- ? 每日所需營養缺失量 -->
            <h3 class="cus-title-border-left-err" v-if="calculatefoodInfo.caloriesDifference > 0">
              每日所需營養缺失量： {{ calculatefoodInfo.caloriesDifference }} (kcal/day)
            </h3>
            <h3 v-else class="cus-title-border-left">補充小知識</h3>
            <div class="text-blue4">
              每日營養最佳分配比例為：<br />
              蛋白質 2：脂肪 2：碳水化合物 6，<br />
              單一種鮮食難以滿足鸚鵡每日所需營養，<br />
              建議可以使用鮮食隨機配！
            </div>
          </div>
          <!-- <pre>
            {{ calculatefoodInfo }}
          </pre> -->
        </div>

        <!-- >> 1 result > pc -->
        <div v-if="calculatefoodInfo" class="hidden lg:block">
          <hr class="cus-line-row" />
          <div class="cus-block-padding">
            <h2 class="cus-page-title">計算結果</h2>

            <!-- ? 每日基本營養需求 -->
            <h3 class="cus-title-border-left">每日基本營養需求</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-4">
                <div class="cus-table-th">熱量 (kcal/day)</div>
                <div class="cus-table-th">蛋白質 (g/day)</div>
                <div class="cus-table-th">脂肪 (g/day)</div>
                <div class="cus-table-th">碳水化合物 (g/day)</div>
              </div>
              <div class="grid grid-cols-4">
                <div class="cus-table-td">{{ calculatefoodInfo.dailyCalories }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.dailyProteinNeed }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.dailyFatNeed }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.dailyCarbsNeed }}</div>
              </div>
            </div>

            <!-- ? 食物營養資訊 -->
            <h3 class="cus-title-border-left">食物營養資訊</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-5">
                <div class="cus-table-th">食物名稱</div>
                <div class="cus-table-th">熱量 (kcal/100g)</div>
                <div class="cus-table-th">蛋白質 (g/100g)</div>
                <div class="cus-table-th">脂肪 (g/100g)</div>
                <div class="cus-table-th">碳水化合物 (g/100g)</div>
              </div>

              <div class="grid grid-cols-5">
                <div class="cus-table-td">{{ calculatefoodInfo.food?.name }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.calories }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.protein }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.fat }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.carbs }}</div>
              </div>
            </div>

            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-5">
                <div class="cus-table-th">每日最大攝取量 (g/day)</div>
                <div class="cus-table-th">食物備註</div>
                <div class="cus-table-th col-span-3">好處</div>
              </div>
              <div class="grid grid-cols-5">
                <div class="cus-table-td">{{ calculatefoodInfo.food?.maxIntake }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.food?.note }}</div>
                <div class="cus-table-td col-span-3">{{ calculatefoodInfo.food?.nutrition }}</div>
              </div>
            </div>

            <!-- ? 食物建議攝取量 & 營養資訊 -->
            <h3 class="cus-title-border-left">食物建議攝取量 & 營養資訊</h3>
            <div class="cus-table mb-5">
              <div class="cus-table-row grid grid-cols-5">
                <div class="cus-table-th">建議攝取量 (g/day)</div>
                <div class="cus-table-th">蛋白質量 (g/day)</div>
                <div class="cus-table-th">脂肪量 (g/day)</div>
                <div class="cus-table-th">碳水化合物量 (g/day)</div>
                <div class="cus-table-th">提供總熱量 (kcal/day)</div>
              </div>

              <div class="grid grid-cols-5">
                <div class="cus-table-td">{{ calculatefoodInfo.foodIntake }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.nutrientsProvided?.protein }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.nutrientsProvided?.fat }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.nutrientsProvided?.carbs }}</div>
                <div class="cus-table-td">{{ calculatefoodInfo.foodProvidedCalories }}</div>
              </div>
            </div>

            <!-- ? 每日所需營養缺失量 -->
            <h3 class="cus-title-border-left-err" v-if="calculatefoodInfo.caloriesDifference > 0">
              每日所需營養缺失量： {{ calculatefoodInfo.caloriesDifference }} (kcal/day)
            </h3>
            <h3 v-else class="cus-title-border-left">補充小知識</h3>
            <div class="text-blue4">
              每日營養最佳分配比例為：<br />
              蛋白質 2：脂肪 2：碳水化合物 6，<br />
              單一種鮮食難以滿足鸚鵡每日所需營養，<br />
              建議可以使用鮮食隨機配！
            </div>
          </div>
          <!-- <pre>
            {{ calculatefoodInfo }}
          </pre> -->
        </div>
      </section>

      <!-- ? 2 指定熱量算鮮食 -->
      <section v-else-if="mode === 2" class="">
        <div class="cus-block-padding">指定熱量算鮮食</div>
      </section>

      <!-- ? 3 指定飼料算攝取量 -->
      <section v-else-if="mode === 3" class="">
        <div class="cus-block-padding">指定飼料算攝取量</div>
      </section>

      <!-- ? 4 指定熱量算飼料 -->
      <section v-else-if="mode === 4" class="">
        <div class="cus-block-padding">指定熱量算飼料</div>
      </section>

      <!-- * bottom introduction -->
      <hr class="cus-line-row" />
      <div class="cus-intro">
        推薦食物及計算方式皆由 AI 協助蒐集和整理，僅供參考。<br />
        若有特殊飲食需求建議尋求專業幫助！
      </div>
    </div>
  </div>
</template>

<style scoped>
/* calculator-tab */
.calculator-tab {
  @apply w-[140px] min-w-[140px] py-[10px] text-center text-[14px] text-blue4 opacity-80;
  border-left: 1px solid transparent;
  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-radius: 6px 6px 0 0;
}

.calculator-tab-active {
  @apply font-bold opacity-100;
  border-left: 1px solid var(--color-blue4);
  border-top: 1px solid var(--color-blue4);
  border-right: 1px solid var(--color-blue4);
}

.overflow-x-auto {
  /* 隱藏滾動條的通用方法 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */

  /* 對於 Webkit (Chrome, Safari, etc.) */
  &::-webkit-scrollbar {
    display: none;
  }
}

/* toggle */
.cus-toggle-tab {
  @apply flex gap-2 rounded-md border border-blue4 p-1 text-[14px];
}

.cus-toggle-tab-item {
  @apply rounded px-3 py-[6px] text-blue4;
}

.cus-toggle-tab-item-active {
  @apply bg-blue4 text-blue1;
}
</style>
