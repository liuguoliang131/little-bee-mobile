<!--
 * @Date: 2022-04-26 10:45:14
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-04-28 14:57:17
 * @FilePath: \little-bee-mobile\src\views\task\detail.vue
 * @Description: 任务详情
-->
<template>
  <div class="detail">
    <bread @click="handleShowShareDialog">
      <van-icon name="share-o" color="#cb9400" />
    </bread>
    <div class="views">
      <van-form @submit="onSubmit">
        <van-field v-model.trim="form.title"
                  type="text"
                  name="title"
                  label="标题"
                  placeholder="请输入标题"
                  required
                  :rules="[{ required: true, message: '请填写标题' }]"
                  :disabled="true" />
        <van-field v-model.trim="form.sortTitle"
                  type="text"
                  name="sortTitle"
                  label="副标题"
                  placeholder="请输入副标题"
                  required
                  :rules="[{ required: true, message: '请填写标题' }]"
                  :disabled="true" />
        <van-field v-model="form.count"
                  type="digit"
                  name="count"
                  label="数量"
                  placeholder="请输入数量"
                  required
                  :rules="[{ required: true, message: '请填写数量' },{ validator: countValidator, message: '数量必须大于0' }]"
                  :disabled="true" />
        <van-field v-model="form.unitPrice"
                  type="number"
                  name="unitPrice"
                  label="单价"
                  placeholder="请输入单价"
                  required
                  :rules="[{ required: true, message: '请填写单价' }, { validator: unitPriceValidator, message: '单价必须大于0' }]"
                  :disabled="true" />
        <van-field v-model.trim="form.remark"
                  type="text"
                  name="remark"
                  label="备注"
                  placeholder="请输入备注"
                  :disabled="true" />
        <van-field v-model="totalPrice"
                  type="number"
                  name="totalPrice"
                  label="总价"
                  :disabled="true" />
        <div class="file">
          <span class="label">图片</span>
          <van-uploader v-model="photos"
                        :deletable="false"
                        :readonly="true"
                        :show-upload="false" />
        </div>
        <!-- <div class="sub-btn">
          <van-button color="#CB9400"
            block
            type="info"
            native-type="submit">提交</van-button>
        </div> -->
        <div class="fixed-b">
          <div class="b-1">
            <div>工序合计: {{1}}元</div>
            <div>利润: {{2}}元</div>
          </div>
          <div class="b-2">
            <van-button color="#CB9400"
                        type="info"
                        plain
                        native-type="button"
                        size="small" @click="handleStart">开始</van-button>
            <van-button color="#CB9400"
                        type="info"
                        plain
                        native-type="button"
                        size="small" @click="handleComplete">完成</van-button>
            <van-button color="#CB9400"
                        type="info"
                        plain
                        native-type="button"
                        size="small" @click="handleSuspend">暂停</van-button>
            <van-button color="#CB9400"
                        type="info"
                        native-type="button"
                        size="small" @click="handleCreate">再次创建</van-button>
          </div>
        </div>
      </van-form>
      <div class="title">
        <div class="title-1">
          工序
        </div>
        <div class="title-2">
          <!-- <van-icon name="plus"
                    @click="handleShowAddDialog" /> -->
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>名称</th>
            <th>单价(元)</th>
            <th>图标</th>
            <th>备注</th>
            <th>技工信息</th>
          </tr>
        </thead>
        <tbody v-if="form.createProcessRequestList.length">
          <tr v-for="(item,index) in form.createProcessRequestList"
              :key="index">
            <td>{{index}}</td>
            <td>{{item.name}}</td>
            <td>{{item.unitPrice}}</td>
            <td>
              <div class="td-img"
                  v-if="item.photos.length">
                <img :src="item.photos[0].url"
                    alt="图标">
                <span>x{{item.photos.length||0}}</span>
              </div>
            </td>
            <td>{{item.remark}}</td>
            <td>
              技工1 x5 技工2 x5
            </td>
          </tr>
        </tbody>
        <tbody v-else
              class="empty">
          <tr>
            <td colspan="6">暂无数据</td>
          </tr>
        </tbody>
      </table>
      <footer></footer>
    </div>
    <van-dialog v-model="dialogVisible"
                title="任务分享"
                :showConfirmButton="false"
                close-on-click-overlay
                @close="close">
      <div class="dialog-content">
        <van-form @submit="dialogFormSubmit"
                  ref="dialogForm">
          <van-field v-model.trim="dialogForm.name"
                     name="name"
                     label="分享标题"
                     placeholder="分享标题"
                     :rules="[{ required: true, message: '请填写用户名' }]" />
          <van-field v-model="dialogForm.unitPrice"
                     type="dight"
                     name="count"
                     label="数量"
                     placeholder="数量"
                     :rules="[{ required: true, message: '请填写数量' },{ validator: unitPriceValidator, message: '数量必须大于0' }]" />
          <van-field v-model="dialogForm.unitPrice"
                     type="number"
                     name="unitPrice"
                     label="分享单价"
                     placeholder="分享单价"
                     :rules="[{ required: true, message: '请填写数量' },{ validator: unitPriceValidator, message: '分享单价必须大于0' }]" />
          <van-field v-model.trim="dialogForm.total"
                     type="number"
                     name="total"
                     label="分享总价"
                     placeholder="分享总价"
                     :disabled="true" />
          <van-field v-model.trim="dialogForm.contracts"
                     type="text"
                     name="contracts"
                     label="联系人"
                     placeholder="联系人"
                     :disabled="true" />
          <van-field v-model="dialogForm.phone"
                     type="text"
                     name="phone"
                     label="联系方式"
                     placeholder="联系方式"
                     :disabled="true" />
          <van-field v-model.trim="dialogForm.address"
                     type="text"
                     name="address"
                     label="联系地址"
                     placeholder="联系地址"
                     :disabled="true" />
          <div class="dialog-submit">
            <van-button color="#CB9400"
                        block
                        type="info"
                        native-type="submit"
                        @click="handleConfirmShare">分享到微信</van-button>
          </div>
        </van-form>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import {
  Form,
  Field,
  Button,
  Uploader,
  Toast,
  Icon,
  Dialog
} from 'vant'
import Bread from '@/components/bread/index'
// import { sys_version_file_upload, h5_job_create } from '@/http/api'
export default {
  name: 'Detail',
  components: {
    VanForm: Form,
    VanField: Field,
    VanButton: Button,
    VanUploader: Uploader,
    VanIcon: Icon,
    VanDialog: Dialog.Component,
    Bread
  },
  data() {
    return {
      form: {
        title: '',
        sortTitle: '',
        count: 1,
        unitPrice: 1,//单价
        remark: '',
        imagesIds: '',
        createProcessRequestList: [
          {
            name: '123',
            unitPrice: 1,
            imagesIds: 'asdasdasd',
            remark: 'asdasd',
            photos: []
          },
          {
            name: '123',
            unitPrice: 1,
            imagesIds: 'asdasdasd',
            remark: 'asdasd',
            photos: []
          }
        ],
        ids: '0', //以下是写死的
        num: '0',
        pidId: '0',
        share: false
      },
      photos: [],
      dialogForm: {

      },
      dialogVisible: false
    }
  },
  methods: {
    handleShowShareDialog() {
      this.dialogVisible = true
    },
    // 确认分享
    handleConfirmShare() {
      this.dialogVisible = false
    },
    close () {
      this.dialogFormInit()
    },
    // 弹窗 数据初始化
    dialogFormInit() {
      this.dialogForm = {
        name: '',
        unitPrice: 1,
        imagesIds: '',
        remark: '',
        photos: []
      }
    },
    // 开始
    handleStart() {

    },
    // 完成
    handleComplete() {
      Dialog.confirm({
        message: '确认完成?',
        confirmButtonColor: '#cb9400'
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    },
    // 暂停
    handleSuspend() {

    },
    // 再次创建
    handleCreate() {

    }
  }
}
</script>

<style scoped lang="less">
.detail {
  .views {
    width: 100%;
    height: calc( 100vh - 36px );
    overflow-y: scroll;
  }
  .share {
    font-size: 12px;
    color: #cb9400;
    text-align: right;
    padding: 15px;
  }
  .sub-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 70px;
    .van-button {
      width: 200px;
    }
  }
  .file {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 13px;
    margin: 0 16px;
    padding: 10px 0;
    border-bottom: 1px solid rgb(245, 246, 247);
    .label {
      width: 80px;
      color: #d8cdcf;
    }
  }
  .title {
    display: flex;
    align-items: center;
    padding: 15px;
    .title-1 {
      flex: 1;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
    }
    .title-2 {
      flex: 0.5;
      color: #cb9400;
      text-align: right;
    }
  }
  footer {
    height: 100px;
  }
  .fixed-b {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0 15px;
    height: 45px;
    display: flex;
    align-items: center;
    font-size: 12px;
    background-color: #fff;
    box-shadow: 0px 0px 9px 0px rgba(51, 51, 51, 0.05);
    .b-1 {
      flex: 1;
      color: #666666;
      line-height: 20px;
    }
    .b-2 {
      flex: 1.8;
      display: flex;
      justify-content: space-around;
    }
  }
  .td-img {
    width: 35px;
    height: 35px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      background-size: cover;
    }
    span {
      display: inline-block;
      position: absolute;
      right: 0px;
      bottom: 0px;
      min-width: 14px;
      height: 14px;
      font-size: 12px;
      text-align: center;
      line-height: 14px;
      color: white;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
