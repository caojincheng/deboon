<template>
  <div>
    <Button type="primary" class="buto">提交预分配</Button>
    <Button type="primary" class="buto">审批流程查看</Button>
    <div class="cal">月度人员预算</div>
    <div class="clear md">
      <div class="fl ml">
        预算年月:
        <!-- <Input prefix="ios-contact" placeholder="Enter name" style="width: auto"/> -->
        <Input placeholder="201904" class="cal-mon" style="width: auto"/>
      </div>
      <div class="fr">
        预算人数:
        <Input placeholder="400" class="cal-mon" style="width: auto"/>
      </div>
    </div>
    <div class="clear md">
      <div class="fl m1">部门在职人数:350人</div>
      <div class="fl ml">
        已提交预分配人数:
        <!-- <Input prefix="ios-contact" placeholder="Enter name" style="width: auto"/> -->
        <Input placeholder="201904" class="cal-mon" style="width: auto"/>
      </div>
      <div class="fr ml">
        需求人数:
        <!-- <Input prefix="ios-contact" placeholder="Enter name" style="width: auto"/> -->
        <Input placeholder="201904" class="cal-mon" style="width: auto"/>
      </div>
    </div>
    <div class="cal">部门人员复核</div>
    <Button type="primary" class="buto">修改复核人数</Button>
    <Button type="primary" class="buto">复核人数确认</Button>
    <table class="tab">
      <tr>
        <td class="tr-1"></td>
        <td class="tr-1"></td>
        <td colspan="5" class="tr-1"></td>
      </tr>
      <tr v-for="item in data2" :key="item.id">
        <td>{{item.name}}</td>
        <td>{{item.age}}</td>
        <td>{{item.address}}</td>
        <td>{{item.date}}</td>
        <td>{{item.people}}</td>
        <td>{{item.count}}</td>
        <td>{{item.all}}</td>
      </tr>
    </table>
    <Row>
      <Col span="12">
        <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
      </Col>
      <Col span="12">
        <DatePicker
          type="daterange"
          placement="bottom-end"
          placeholder="Select date"
          style="width: 200px"
        ></DatePicker>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns1: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      data2: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03",
          people: 12,
          count: 13,
          all: 19
        },
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03",
          people: 12,
          count: 13,
          all: 19
        },
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03",
          people: 12,
          count: 13,
          all: 19
        }
      ]
    };
  }
};
</script>

<style scoped lang="less">
.clear {
  overflow: hidden;
}
.buto {
  width: 200px;
  height: 40px;
  margin-right: 30px;
  margin-left: 10px;
  border-radius: 5px;
}
.cal {
  width: 333px;
  height: 60px;
  line-height: 60px;
  font-size: 30px;
  margin-top: 30px;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.cal-mon {
  margin-left: 90px;
}
.cal-mon1 {
  margin-left: 100px;
}
.md {
  margin-bottom: 30px;
  padding-right: 50px;
}
.m1 {
  font-size: 16px;
  font-weight: 700;
  padding-left: 20px;
  margin-right: 300px;
}
.ml {
  margin-left: 37px;
}

.tab {
  width: 100%;
  height: 200px;
  border: 1px solid #000;
  margin-top: 5px;

  td {
    border-top: 1px solid rgba(0, 0, 0, 0.404);
    border-right: 1px solid rgba(0, 0, 0, 0.404);
  }
}
.tr-1 {
  border: none !important;
}
</style>
