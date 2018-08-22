<template>
  <q-page padding>
    <div class="page-view">
       <div class="page-titles">
        <h3>Client</h3>
      </div>
      <router-link class="add-btn" to="/admin/createclient">Add Client</router-link>
      <q-card>
        <q-card-title class="card-header">
          Client List
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-table :data="clientListTableData" :pagination.sync="pagination" :columns="clientcolumns" row-key="name" class="table-view">
                  <q-tr slot="body" slot-scope="props" :props="props">
                    <q-td key="action" :props="props" >
                      <q-btn round color="secondary" icon="visibility" @click="viewClient"/>
                      &nbsp;&nbsp;
                      <q-btn round color="amber" text-color="black" icon="edit" />
                    </q-td>
                    <q-td key="name" :props="props" >
                      {{props.row.name}}
                    </q-td>
                    <q-td key="type" :props="props" >
                      {{props.row.type}}
                    </q-td>
                    <q-td key="staff" :props="props" >
                      {{props.row.staffName}}
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
  name: 'ClientList',
  components: {
  },
  data () {
    return {
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
          name: 'staff',
          required: true,
          label: 'Staff Name',
          align: 'left',
          field: 'staffName',
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
        sortBy: null, // String, column "name" property value
        descending: true,
        page: 1,
        rowsPerPage: 10 // current rows per page being displayed
      }
    }
  },

  computed: {
    clientListTableData() {
       var clientArr = [
        {name: "Jackques Nelson", type: "GST Type 1", phone: +984469388638, emailId: "micheal@gmail.com", staffName: "Test"},
        {name: "Erich Mcbride", type: "GST Type 2", phone: +984469388638, emailId: "erich@gmail.com", staffName: "Test"},
        {name: "Noah James", type: "GST Type 2", phone: +984469388638, emailId: "chris@gmail.com", staffName: "Test"},
        {name: "Jackques Peter", type: "GST Type 5", phone: +984469388638, emailId: "samuel@gmail.com", staffName: "Test"},
        {name: "Jonny Ive", type: "GST Type 4", phone: +984469388638, emailId: "sophie@gmail.com", staffName: "Test"},
        {name: "David Nelson", type: "GST Type 1", phone: +984469388638, emailId: "micheal@gmail.com", staffName: "Test"},
        {name: "Erich Mcbride", type: "GST Type 1", phone: +984469388638, emailId: "erich@gmail.com", staffName: "Test"},
        {name: "Noah David", type: "GST Type 3", phone: +984469388638, emailId: "chris@gmail.com", staffName: "Test"},
        {name: "Ethan David", type: "GST Type 3", phone: +984469388638, emailId: "samuel@gmail.com", staffName: "Test"},
        {name: "Jonny Ive", type: "GST Type 5", phone: +984469388638, emailId: "sophie@gmail.com", staffName: "Test"},
      ];
      return clientArr;
    }
  },

  methods:{

    viewClient(){
      this.$router.push('/admin/clientprofile')
    },

  },

}
</script>

<style>
.table-view .statusDone{
  color: green;
}
.table-view .statusPending{
  color: red;
}
</style>
