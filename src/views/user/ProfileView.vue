<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useProfileStore } from '@/stores/profile';
import { useAddressStore } from '@/stores/address';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Button from '@/components/utilities/Button.vue';
import TextInput from '@/components/utilities/TextInput.vue';
import SelectInput from '@/components/utilities/SelectInput.vue';
import TextArea from '@/components/utilities/TextArea.vue';

const store = useProfileStore();
const address = useAddressStore();
const { profile } = storeToRefs(store);
const { loading, regions, provinces, municipalities, brgys } = storeToRefs(address);

const isEditable = ref(false);
const firstname = ref('');
const lastname = ref('');
const email = ref('');
const phone = ref('');
const region = ref('');
const province = ref('');
const municipality = ref('');
const brgy = ref('');
const street = ref('');

const saveProfile = async () => {
  isEditable.value = false;

  const data = {
    'id': localStorage.getItem('id') ?? 0,
    'firstName': firstname.value,
    'lastName': lastname.value,
    'email': email.value,
    'phone': phone.value,
    'region': region.value,
    'province': province.value,
    'municipalities': municipalities.value,
    'brgy': brgy.value,
    'street': street.value
  }

  const result = await store.save(data);
}

onMounted(async () => {
  await store.getProfile(localStorage.getItem('id') ?? 0);
  await address.getRegions();
});
</script>

<template>
  <section class="w-full pt-2">

    <div class="w-[80%] mx-auto rounded bg-blue-100 shadow-xl overflow-hidden">
      <div class="w-full p-6 flex items-baseline-last justify-between text-slate-950 bg-linear-to-l from-purple-400 to-purple-700">
        <div class="flex items-baseline justify-center gap-3">
          <div class="w-40 h-40 text-8xl text-slate-400 flex items-center justify-center rounded-full bg-slate-50" >
            <FontAwesomeIcon icon="fa-solid fa-user-tie"/>
          </div>
          <div class="text-3xl text-slate-100 font-semibold flex flex-col">
            <span v-if="profile.first_name" >{{`${profile.first_name} ${profile.last_name}`}}</span>
            <span>@{{ profile.username }}</span>
          </div>
        </div>

        <div class="flex items-center justify-center gap-4">
          <Button
            v-if="!isEditable"
            type="button"
            label="Edit Profile"
            class="px-6 py-3 font-semibold text-slate-50 rounded outline-2 outline-blue-200 bg-linear-to-b from-purple-400 to-purple-700 cursor-pointer"
            @click="isEditable = true"
          />
          <Button
            v-else
            type="button"
            label="Save Profile"
            class="px-6 py-3 font-semibold text-slate-50 rounded outline-2 outline-blue-200 bg-linear-to-b from-purple-400 to-purple-700 cursor-pointer"
            @click="saveProfile"
          />
        </div>
      </div>

      <form
        class="w-full p-4 flex flex-col gap-3"
        @submit.prevent=""
      >
        <div class="flex items-center justify-center gap-4">
          <TextInput
            id="firstname"
            type="text"
            label="Firstname"
            :disabled="!isEditable"
            :placeholder="profile.first_name ?? 'Firstname'"
            inputClass="px-3 py-2 text-slate-950 rounded border-none bg-blue-200 disabled:cursor-not-allowed"
            v-model:input-value="firstname"
          />
          <TextInput
            id="lastname"
            type="text"
            label="Lastname"
            :disabled="!isEditable"
            :placeholder="profile.last_name ?? 'Lastname'"
            inputClass="px-3 py-2 text-slate-950 rounded border-none bg-blue-200 disabled:cursor-not-allowed"
            v-model:input-value="lastname"
          />
        </div>
        <div class="flex items-center justify-center gap-4">
          <TextInput
            id="email"
            type="email"
            label="Email"
            :disabled="!isEditable"
            :placeholder="profile.email ?? 'Email'"
            inputClass="px-3 py-2 text-slate-950 rounded border-none bg-blue-200 disabled:cursor-not-allowed"
            v-model:input-value="email"
          />
          <TextInput
            id="phone"
            type="text"
            label="Phone"
            :disabled="!isEditable"
            :placeholder="profile.phone ?? 'Phone'"
            inputClass="px-3 py-2 text-slate-950 rounded border-none bg-blue-200 disabled:cursor-not-allowed"
            v-model:input-value="phone"
          />
        </div>
        <div class="mt-4 p-4 rounded bg-blue-200">
          <p class="uppercase font-semibold tracking-wide">Address Details</p>
          <div class="mt-4 grid grid-cols-2 gap-2">
            <SelectInput
              id="region"
              label="Region"
              :options="regions"
              optionValue="code"
              optionLabel="regionName"
              :disabled="!isEditable"
              :isLoading="loading.regions"
              v-model:input-value="region"
              @update:inputValue="address.getProvinces(region)"
            />
            <SelectInput
              id="province"
              label="Province"
              :options="provinces"
              optionValue="code"
              optionLabel="name"
              :disabled="!isEditable"
              :isLoading="loading.provinces"
              v-model:input-value="province"
              @update:inputValue="address.getMunicipalities(province)"
            />
          </div>
          <div class="my-4 grid grid-cols-2 gap-2">
            <SelectInput
              id="municipality"
              label="municipality"
              :options="municipalities"
              optionValue="code"
              optionLabel="name"
              :disabled="!isEditable"
              :isLoading="loading.municipalities"
              v-model:input-value="municipality"
              @update:inputValue="address.getBrgys(municipality)"
            />
            <SelectInput
              id="brgy"
              label="Barangays"
              :options="brgys"
              optionValue="code"
              optionLabel="name"
              :disabled="!isEditable"
              :isLoading="loading.brgys"
              v-model:input-value="brgy"
            />
          </div>
          <TextArea
            id="street"
            label="Street/Subd/Bldg/Lot Details"
            :disabled="!isEditable"
            v-model="street"
          />
        </div>
      </form>


    </div>

  </section>
</template>
