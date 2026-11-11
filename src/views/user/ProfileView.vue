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
import Toast from '@/components/utilities/Toast.vue';
import LoadingBar from '@/components/utilities/LoadingBar.vue';

const user = useProfileStore();
const address = useAddressStore();
const { profile, toast, errors } = storeToRefs(user);
const { loading, regions, provinces, municipalities, brgys } = storeToRefs(address);

const isLoading = ref(true);
const isEditable = ref(false);
const id = ref('');
const username = ref('');
const firstname = ref('');
const lastname = ref('');
const email = ref('');
const phone = ref('');
const region = ref('');
const province = ref('');
const municipality = ref('');
const brgy = ref('');
const street = ref('');

const save = async () => {

  const data = {
    'id': id.value,
    'firstName': firstname.value,
    'lastName': lastname.value,
    'email': email.value,
    'phone': phone.value,
    'region': region.value,
    'province': province.value,
    'municipality': municipality.value,
    'brgy': brgy.value,
    'street': street.value
  }

  const result = await user.saveProfile(data);

  if (result.status === 200) {
    await user.getProfile(id.value);
    isEditable.value = false;
  }

}

onMounted(async () => {
  isLoading.value = true;

  const uid = sessionStorage.getItem('uid');
  const prof = await user.getProfile(uid ?? 0);
  const data = prof.data;

  if (data) {
    id.value = data.id;
    username.value = data.username;
    firstname.value = data.firstName;
    lastname.value = data.lastName;
    email.value = data.email;
    phone.value = data.phone;

    await address.getRegions();
    region.value = data.region;

    await address.getProvinces(data.region);
    province.value = data.province;

    await address.getMunicipalities(data.province);
    municipality.value = data.municipality;

    await address.getBrgys(data.municipality);
    brgy.value = data.brgy;

    street.value = data.street;
  }

  isLoading.value = false;
});

</script>

<template>
  <section>
    <div class="profile-container">
      <div class="profile-header">
        <div class="profile-icon-container">
          <div class="profile-icon">
            <FontAwesomeIcon icon="fa-solid fa-user-tie"/>
          </div>
          <div class="profile-name">
            <span>{{ profile.firstName }} {{ profile.lastName }}</span>
            <span>@{{ profile.username }}</span>
          </div>
        </div>

        <div class="profile-btn-container">
          <Button
            v-if="!isEditable"
            :disabled="isLoading"
            type="button"
            label="Edit Profile"
            class="edit-profile-btn"
            @click="isEditable = true"
          />
          <Button
            v-else
            type="button"
            label="Save Profile"
            class="save-profile-btn"
            @click="save"
          />
        </div>
      </div>

      <LoadingBar v-if="isLoading" />

      <form v-else @submit.prevent="">
        <div class="input-container">
          <TextInput
            id="firstname"
            type="text"
            label="Firstname"
            :disabled="!isEditable"
            placeholder="Firstname"
            v-model:input-value="firstname"
          />
          <TextInput
            id="lastname"
            type="text"
            label="Lastname"
            :disabled="!isEditable"
            placeholder="Lastname"
            v-model:input-value="lastname"
          />
        </div>
        <div class="input-container">
          <TextInput
            id="email"
            type="email"
            label="Email"
            :disabled="!isEditable"
            placeholder="Email"
            :error="errors?.email ?? ''"
            v-model:input-value="email"
          />
          <TextInput
            id="phone"
            type="text"
            label="Phone"
            :disabled="!isEditable"
            placeholder="Phone"
            v-model:input-value="phone"
          />
        </div>
        <div class="address-details-container">
          <p>Address Details</p>
          <div class="input-container">
            <SelectInput
              id="region"
              label="Region"
              :options="regions"
              optionValue="code"
              optionLabel="regionName"
              :disabled="!isEditable"
              :isLoading="loading.regions"
              v-model:input-value="region"
              @update:inputValue="address.getProvinces(region), province = ''"
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
              @update:inputValue="address.getMunicipalities(province), municipality = ''"
            />
          </div>
          <div class="input-container">
            <SelectInput
              id="municipality"
              label="municipality"
              :options="municipalities"
              optionValue="code"
              optionLabel="name"
              :disabled="!isEditable"
              :isLoading="loading.municipalities"
              v-model:input-value="municipality"
              @update:inputValue="address.getBrgys(municipality), brgy = ''"
            />
            <SelectInput
              id="brgy"
              label="Barangay"
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
            :text="street ?? ''"
            :disabled="!isEditable"
            v-model:input-value="street"
          />
        </div>
      </form>

    </div>

    <Toast :show="toast.show" :type="toast.type" :text="toast.msg" />

  </section>
</template>
