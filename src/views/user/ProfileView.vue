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
const { profile, errors } = storeToRefs(store);
const { loading, regions, provinces, municipalities, brgys } = storeToRefs(address);

const prof = JSON.parse(localStorage.getItem('profile'));

const isEditable = ref(false);
const username = ref('');
const firstname = ref();
const lastname = ref('');
const email = ref('');
const phone = ref('');
const region = ref('');
const province = ref('');
const municipality = ref('');
const brgy = ref('');
const street = ref('');

const save = async () => {
  isEditable.value = false;

  const data = {
    'id': prof.id ?? 0,
    'firstName': firstname.value,
    'lastName': lastname.value,
    'email': email.value,
    'phone': phone.value,
    'region': region.value,
    'province': province.value,
    'municipalities': municipality.value,
    'brgy': brgy.value,
    'street': street.value
  }

  await store.saveProfile(data);

}

onMounted(async () => {

  if (prof || profile) {
    username.value = prof.username ?? profile.username;
    firstname.value = prof.firstName ?? profile.firstName;
    lastname.value = prof.lastName ?? profile.lastName;
    email.value = prof.email ?? profile.email;
    region.value = prof.region ?? profile.region;
    province.value = prof.province?? profile.province;
    municipality.value = prof.municipality ?? profile.municipality;
    brgy.value = prof.brgy ?? profile.brgy;
    street.value = prof.street ?? profile.street;
  }

  await address.getRegions();
});
</script>

<template>
  <section>
    <div class="profile-container">
{{ profile }}
      <div class="profile-header">
        <div class="profile-icon-container">
          <div class="profile-icon">
            <FontAwesomeIcon icon="fa-solid fa-user-tie"/>
          </div>
          <div class="profile-name">
            <span v-if="prof.firstName" >{{`${prof.firstName} ${prof.lastName}`}}</span>
            <span>@{{ prof.username }}</span>
          </div>
        </div>

        <div class="profile-btn-container">
          <Button
            v-if="!isEditable"
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

      <form @submit.prevent="">
        <div class="input-container">
          <TextInput
            id="firstname"
            type="text"
            label="Firstname"
            :disabled="!isEditable"
            :placeholder="profile.first_name ?? 'Firstname'"
            inputClass=""
            v-model:input-value="firstname"
          />
          <TextInput
            id="lastname"
            type="text"
            label="Lastname"
            :disabled="!isEditable"
            :placeholder="profile.last_name ?? 'Lastname'"
            inputClass=""
            v-model:input-value="lastname"
          />
        </div>
        <div class="input-container">
          <TextInput
            id="email"
            type="email"
            label="Email"
            :disabled="!isEditable"
            :placeholder="profile.email ?? 'Email'"
            :error="errors?.email ?? ''"
            inputClass=""
            v-model:input-value="email"
          />
          <TextInput
            id="phone"
            type="text"
            label="Phone"
            :disabled="!isEditable"
            :placeholder="profile.phone ?? 'Phone'"
            inputClass=""
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
              @update:inputValue="address.getBrgys(municipality)"
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
            :disabled="!isEditable"
            v-model="street"
          />
        </div>
      </form>


    </div>

  </section>
</template>
