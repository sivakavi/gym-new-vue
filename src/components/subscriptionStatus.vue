<template>
  <span :class="classComputed">{{textComputed}}</span>
</template>

<script>
export default {

  name: 'SubscriptionStatus',
  
  props: ['status'],
  
  data () {
    return {

    }
  },
  
  computed:{
  
    textComputed: function(){
      if(this.status == '0'){
        return 'Disabled'
      }else{
        return 'Enabled'
      }
    },
  
    classComputed: function(){
      if(this.status == '0'){
        return 'status-disabled'
      }else{
        return 'status-enabled'
      }
    },
  
  },

}
</script>

<style>
  
  .status-enabled{
    color: #ffffff;
    background: #47bf89;
    padding: 5px 15px;
    border-radius: 15px;
  }

  .status-disabled{
    color: #ffffff;
    background: #e8212e;
    padding: 5px 15px;
    border-radius: 15px;
  }
  
</style>
