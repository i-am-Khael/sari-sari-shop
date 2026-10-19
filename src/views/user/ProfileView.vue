<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useProfileStore } from '@/stores/profile';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Button from '@/components/utilities/Button.vue';
import TextInput from '@/components/utilities/TextInput.vue';
import TextArea from '@/components/utilities/TextArea.vue';

const store = useProfileStore();
const { profile } = storeToRefs(store);

const isEditable = ref(false);
const firstname = ref('');
const lastname = ref('');
const email = ref('');
const phone = ref('');
const address = ref('');

const saveProfile = async () => {
  isEditable.value = false;

  const data = {
    'id': localStorage.getItem('id') ?? 0,
    'firstName': firstname.value ?? profile.value.first_name,
    'lastName': lastname.value ?? profile.value.last_name,
    'email': email.value ?? profile.value.email,
    'phone': phone.value ?? profile.value.phone,
    'address': address.value ?? profile.value.address,
  }

  const result = await store.save(data);
}

onMounted(async () => {
  await store.getProfile(localStorage.getItem('id') ?? 0);
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
        <TextArea
          id="address"
          label="Address"
          :text="profile.address ?? 'Address'"
          :disabled="!isEditable"
          textAreaClass="p-2 rounded bg-blue-200 disabled:cursor-not-allowed"
          v-model:input-value="address"
        />
      </form>


    </div>

  </section>
</template>
