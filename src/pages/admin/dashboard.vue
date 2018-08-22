<template>
  <q-page padding>
    <div class="page-view">
       <div class="page-titles">
        <h3>Dashboard</h3>
      </div>
      <div class="state-overview">
        <div class="row gutter-sm">
          <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="info-box bg-blue">
              <span class="info-box-icon push-bottom">
                <q-icon name="wc" color="white" size="40px"/>
              </span>
              <div class="info-box-content">
                <span class="info-box-text">Client</span>
                <span class="info-box-number">450</span>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="info-box bg-purple">
              <span class="info-box-icon push-bottom">
                <q-icon name="list" color="white" size="40px"/>
              </span>
              <div class="info-box-content">
                <span class="info-box-text">GST Type</span>
                <span class="info-box-number">4</span>
              </div>
            </div>
          </div>
           <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="info-box bg-green">
              <span class="info-box-icon push-bottom">
                <q-icon name="people" color="white" size="40px"/>
              </span>
              <div class="info-box-content">
                <span class="info-box-text">Staff</span>
                <span class="info-box-number">10</span>
              </div>
            </div>
          </div>
        </div>
      </div>

       <!-- Satff list -->
      <q-card>
        <q-card-title class="card-header">
          Notification : Due Client List
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-table :data="clietnListTableData" :pagination.sync="pagination" :columns="clientcolumns" :hide-bottom= true row-key="name" class="table-view">
             <q-tr slot="body" slot-scope="props" :props="props">
              <q-td key="serial" :props="props" >
                 {{props.row.serial}}
              </q-td>
              <q-td key="name" :props="props" >
                 {{props.row.name}}
              </q-td>
              <q-td key="type" :props="props" >
                 {{props.row.type}}
              </q-td>
              <q-td key="date" :props="props" >
                 {{props.row.date}}
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
      clientcolumns: [
        {
          name: 'serial',
          required: true,
          label: 'Sl No',
          align: 'left',
          field: 'serial',
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
          label: 'GST Type',
          align: 'left',
          field: 'type',
          sortable: true
        },
        {
          name: 'date',
          required: true,
          label: 'Due Date',
          align: 'left',
          field: 'date',
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
        rowsPerPage: 5
      }
    }
  },

  computed: {

    clietnListTableData() {
       var clientArr = [
        {serial: 1, name: "Jackques Nelson", type: "GST Type 2", date: "20-08-2018", phone: +984469388638, emailId: "micheal@gmail.com"},
        {serial: 2, name: "Erich Mcbride", type: "GST Type 5", date: "20-08-2018", phone: +984469388638, emailId: "erich@gmail.com"},
        {serial: 3, name: "Jennifer Lopez", type: "GST Type 1", date: "20-08-2018", phone: +984469388638, emailId: "chris@gmail.com"},
        {serial: 4, name: "Jackques Nelson", type: "GST Type 1", date: "20-08-2018", phone: +984469388638, emailId: "samuel@gmail.com"},
        {serial: 5, name: "Jonny Ive", type: "GST Type 1", date: "20-08-2018", phone: +984469388638, emailId: "sophie@gmail.com"},
      ];
      return clientArr;
    }

  }

}
</script>

<style>

</style>
