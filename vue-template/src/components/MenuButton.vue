<template>
    <Button v-if="isshow" @click="childClick">{{buttontext}}</Button>
</template>
<script>
import {getButtonAuth} from '../api/login'
export default {
  name: "menubutton",
    props: {
      functioncode: {
        type: String,
        required: true,
      
      },
      buttontext:{
          type: String,
          default: () => "default"
      }
    },
    data () {
      return {
        isshow:false
      }
    },
    created(){   
        var me =this;
        new Promise((resolve,reject)=>{
        getButtonAuth(me.functioncode).then((result) => {
          const rsp=result.data;
          if(rsp.length>0){
            me.isshow=rsp[0].isAuth
          }
          resolve(result);
        }).catch((err) => {
          alert("获取按钮权限失败，请坚稍后重试")
        });  
        })  
      },
    methods: {
        childClick() {
            this.$emit('clickfunction',this.isshow)
        }
    }
  };
</script>