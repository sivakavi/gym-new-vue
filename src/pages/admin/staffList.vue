<template>
  <q-page padding>
    <div class="page-view">
       <div class="page-titles">
        <h3>Staff</h3>
      </div>
       <!-- Satff list -->
      <router-link class="add-btn" to="/admin/createstaff">Add Staff</router-link>
      <q-card>
        <q-card-title class="card-header">
          Staff List
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-table :data="staffListTableData" :pagination.sync="pagination" :columns="staffcolumns" row-key="name" class="table-view">
             <q-tr slot="body" slot-scope="props" :props="props">
              <q-td key="action" :props="props" >
                <q-btn round color="secondary" icon="visibility" @click="viewStaff"/>
                &nbsp;&nbsp;
                <q-btn round color="amber" text-color="black" icon="edit" />
              </q-td>
              <q-td key="staffName" :props="props" >
                 {{props.row.staffName}}
              </q-td>
              <q-td key="gender" :props="props" >
                 {{props.row.gender}}
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
    
  </q-page>
</template>

<script>
export default {
  name: 'PageName',
  components: {
  },
  data () {
    return {
      staffListTableData: [],
      staffcolumns: [
        {
          name: 'action',
          required: true,
          label: 'Action',
          align: 'left',
          field: 'action',
          sortable: false
        },
        {
          name: 'staffName',
          required: true,
          label: 'Staff Name',
          align: 'left',
          field: 'staffName',
          sortable: true
        },
        {
          name: 'gender',
          required: true,
          label: 'Gender',
          align: 'left',
          field: 'gender',
          sortable: true
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
    
  },

  methods:{

    viewStaff(){
      this.$router.push('/admin/staffprofile')
    },

    getStaffList(){
      let self = this;
      api
        .get('staffsgst-types')
        .then(function(response) {
          self.staffListTableData = response.data;
        })
        .catch(function(error) {
          console.log("staff table get data error---",error);
        });
    },


  },

  created(){



  }

}
</script>

<style>

</style>
