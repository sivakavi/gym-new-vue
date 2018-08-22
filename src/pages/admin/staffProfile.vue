<template>
  <q-page padding>
    <div class="page-view">
      <!-- Page-title -->
      <div class="page-titles">
        <h3>Staff detail <q-btn round color="black" @click="goBack" style="float:right;" icon="keyboard_backspace" /></h3>
      </div>

      <!-- View Appointments-->
      <div class="row gutter-md">
        <div class="col-sm-12 col-lg-4">
          <!-- Personal-details -->
          <div class="profile-sidebar">
            <q-card>
              <q-card-title class="card-header">
                Personal Details
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
                    <b>Address</b>
                    <span>456, Pragri flat, varacha road, Surat Gujarat, India.</span>
                  </li>
                </ul>
              </q-card-main>
            </q-card>
          </div>
           
          
        </div>
        
        <div class="col-lg-8">
          <!-- today consultancy  -->
          <div class="test-view">
             <q-card>
              <q-card-title class="card-header">
                Assigned Clients
              </q-card-title>
              <q-card-separator />
              <q-card-main class="about">
                <q-table :data="clientListTableData" :pagination.sync="pagination" :columns="clientcolumns" row-key="name" class="table-view">
                  <q-tr slot="body" slot-scope="props" :props="props">
                    <q-td key="action" :props="props" >
                      <q-btn round color="secondary" icon="visibility"/>
                    </q-td>
                    <q-td key="name" :props="props" >
                      {{props.row.name}}
                    </q-td>
                    <q-td key="type" :props="props" >
                      {{props.row.type}}
                    </q-td>
                    <q-td key="phone" :props="props" >
                      {{props.row.phone}}
                    </q-td>
                    <q-td key="emailId" :props="props" >
                      {{props.row.emailId}}
                    </q-td>
                  </q-tr>
                </q-table>
              </q-card-main>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Autocomplete from 'vuejs-auto-complete'
export default {
  name: 'myprofile',
  components: {
    Autocomplete
  },
  data () {
    return {
      picture: './statics/male-receptionist.jpg',
      clientcolumns: [
        {
          name: 'action',
          required: true,
          label: 'Action',
          align: 'left',
          field: 'action',
          sortable: false
        },
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'type',
          required: true,
          label: 'Type',
          align: 'left',
          field: 'type',
          sortable: false
        },
        {
          name: 'phone',
          required: true,
          label: 'Phone number',
          align: 'left',
          field: 'phone',
          sortable: true
        },
        {
          name: 'emailId',
          required: true,
          label: 'Email id',
          align: 'left',
          field: 'emailId',
          sortable: true
        },
      ],
       pagination: {
        sortBy: null,
        descending: true,
        page: 1,
        rowsPerPage: 10
      }
    }
  },

  computed: {
    clientListTableData() {
       var clientArr = [
        {name: "Jackques Nelson", type: "GST Type 2", phone: +984469388638, emailId: "micheal@gmail.com"},
        {name: "Erich Mcbride", type: "GST Type 3", phone: +984469388638, emailId: "erich@gmail.com"},
        {name: "Noah David", type: "GST Type 4", phone: +984469388638, emailId: "chris@gmail.com"}        
      ];
      return clientArr;
    }
  },

  methods: {

    goBack(){
      this.$router.push('/admin/stafflist')
    },
    
  },
  
}
</script>

<style>

</style>
