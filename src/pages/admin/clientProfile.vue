<template>
  <q-page padding>
    <div class="page-view">
      <!-- Page-title -->
      <div class="page-titles">
        <h3>Client detail <q-btn round color="black" @click="goBack" style="float:right;" icon="keyboard_backspace" /></h3>
      </div>

      <!-- View Appointments-->
      <div class="row gutter-md">
        <div class="col-sm-12 col-lg-12">
          <!-- Personal-details -->
          <div class="profile-sidebar">
            <q-card>
              <q-card-title class="card-header">
                Personal Details <q-btn color="purple" style="float:right;" @click="addGST" label="Add GST Type" />
              </q-card-title>
              <q-card-separator />
              <q-card-main>
                <div class="profile-userpic">
                  <img :src="picture" class="img-responsive" alt="">
                </div>
                <div class="profile-usertitle">
                  <div class="profile-usertitle-name"> Rakesh M </div>
                </div>
                <ul class="list-group list-group-unbordered">
                  <li class="list-group-item">
                    <b>Full Name</b>
                    <span>Rakesh M</span>
                  </li>
                  <li class="list-group-item">
                    <b>GST Type</b>
                    <span>GST Type 1 , GST Type 3</span>
                  </li>
                  <li class="list-group-item">
                    <b>Email Id</b>
                    <span>rakeshm@gmail.com</span>
                  </li>
                  <li class="list-group-item">
                    <b>Phone Number</b>
                    <span>+91 8124673306</span>
                  </li>
                  <li class="list-group-item">
                    <b>Gender</b>
                    <span>Male</span>
                  </li>
                  <li class="list-group-item">
                    <b>Data of birth</b>
                    <span>24-03-1989</span>
                  </li>
                  <li class="list-group-item">
                    <b>Assigned Staff</b>
                    <span>Sivakavi J</span>
                  </li>
                  <li class="list-group-item">
                    <b>Address</b>
                    <span>456, Pragri flat, varacha road, Surat Gujarat, India.</span>
                  </li>
                </ul>
              </q-card-main>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'myprofile',
  components: {
  },
  data () {
    return {
      picture: './statics/male-receptionist.jpg',
    }
  },

  computed: {
    
  },

  methods: {

    goBack(){
      this.$router.push('/admin/clientlist')
    },

    addGST(){
      this.$router.push('/admin/addgsttype')
    }
    
  },
  
}
</script>

<style>

</style>
