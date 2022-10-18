<template>
  <div class="register-form">
    <img src="@/assets/common/logo2.webp" alt="" class="logo" />
    <el-form class="form" ref="formRef" :rules="rules" :model="account">
      <h2>新用户注册</h2>
      <el-form-item class="form-item" prop="petName">
        <i class="iconfont icon-yonghu"></i>
        <el-input v-model="account.petName" placeholder="请输入账号"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item class="form-item" prop="petPwd">
        <i class="iconfont icon-mima"></i>
        <el-input
          v-model="account.petPwd"
          type="password"
          show-password
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>

      <!-- 同意协议 -->
      <div class="agree">
        <el-checkbox v-model="isAgree"
          >我同意好伙伴宠物商城
          <span @click="browseAgreement">《用户注册协议》</span></el-checkbox
        >
      </div>
      <el-button class="registerBtn" @click="handleRegister" type="success"
        >注册</el-button
      >
      <div class="toLogin"><span @click="toLogin">已账号，去登录</span></div>
    </el-form>
  </div>

  <!-- 协议对话框 -->
  <el-dialog v-model="dialogVisible" top="5vh" width="50%" :show-close="false">
    <div class="content">
      <h2>《好伙伴宠物商城用户注册协议》</h2>
      <h3>一、服务条款的确认及接受</h3>
      <p>
        1.
        好伙伴宠物商城客户端软件（以下称“本软件”）各项电子服务的所有权和运作权归属于“好伙伴宠物商城”所有，
        本软件提供的服务将完全按照其发布的服务条款和操作规则严格执行。您确认所有服务条款并完成注册程序时，
        本协议在您与本软件间成立并发生法律效力，同时您成为本软件正式用户。
      </p>
      <p>
        2.
        根据国家法律法规变化及本软件运营需要，好伙伴宠物商城有权对本协议条款及相关规则不时地进行修改，
        修改后的内容一旦以任何形式公布在本软件上即生效，并取代此前相关内容，您应不时关注本软件公告、提示信息及协议、
        规则等相关内容的变动。您知悉并确认，如您不同意更新后的内容，应立即停止使用本软件；如您继续使用本软件，
        即视为知悉变动内容并同意接受。
      </p>
      <h3>二、服务需知</h3>
      <p>
        1.
        本软件运用自身开发的操作系统通过国际互联网络为用户提供购买商品等服务。使用本软件，您必须：
        （1）自行配备上网的所需设备，包括个人手机、平板电脑、调制解调器、路由器等；
        （2）自行负担个人上网所支付的与此服务有关的电话费用、网络费用等；
      </p>
      <p>
        2. 基于本软件所提供的网络服务的重要性，您确认并同意：
        （1）提供的注册资料真实、准确、完整、合法有效，注册资料如有变动的，应及时更新；
        （2）如果您提供的注册资料不合法、不真实、不准确、不详尽的，您需承担因此引起的相应责任及后果
      </p>
      <h3>三、订单</h3>
      <p>
        1.
        使用本软件下订单，您应具备购买相关商品的权利能力和行为能力，如果您在18周岁以下，您需要在父母或监护人的监护参与下才能使用本软件。
        在下订单的同时，即视为您满足上述条件，并对您在订单中提供的所有信息的真实性负责。
      </p>
      <p>
        2.
        在您下订单时，请您仔细确认所购商品的名称、价格、数量、型号、规格、尺寸、联系地址、电话、收货人等信息。
        收货人与您本人不一致的，收货人的行为和意思表示视为您的行为和意思表示，您应对收货人的行为及意思表示的法律后果承担连带责任。
      </p>
      <p>
        3.
        您理解并同意：本软件上销售商展示的商品和价格等信息仅仅是要约邀请，您下单时须填写您希望购买的商品数量、
        价款及支付方式、收货人、联系方式、收货地址（合同履行地点）、合同履行方式等内容；
        系统生成的订单信息是计算机信息系统根据您填写的内容自动生成的数据，仅是您向销售商发出的合同要约；
        销售商收到您的订单信息后，只有在销售商将您在订单中订购的商品从仓库实际直接向您发出时（以商品出库为标志），
        方视为您与销售商之间就实际直接向您发出的商品建立了合同关系；如果您在一份订单里订购了多种商品并且销售商只给您发出了部分商品时，
        您与销售商之间仅就实际直接向您发出的商品建立了合同关系；只有在销售商实际直接向您发出了订单中订购的其他商品时，
        您和销售商之间就订单中其他已实际直接向您发出的商品才成立合同关系。
      </p>
      <p>
        5.
        您理解并同意：好伙伴宠物商城只允许每位用户使用唯一好伙伴宠物商城账户。
        如有证据证明或好伙伴宠物商城根据《好伙伴宠物商城用户协议》判断您存在不当注册或不当使用多个E宠商城账户的情形
        好伙伴宠物商城可以采取冻结或关闭账户、取消订单、拒绝提供服务等措施，如给好伙伴宠物商城造成损失的，您还应承担赔偿责任。
        我们所发布的所有活动信息、优惠内容、购物项目，您仅可以唯一账户方式进行除访问、浏览外的参与和购物。
        我们会对您以多账号形式产生的上传、评价、订单等除访问、浏览外的功能进行限制。我们会以您的个人信息匹配的方式进行多账号情况的甄别
        ，如出现以下情况之一：
      </p>
      <h3>四、配送</h3>
      <p>
        1.
        您在本软件购买的商品将按照本软件上您所指定的送货地址进行配送。订单信息中列出的送货时间为参考时间，参考时间的计算是根据库存状况、
        正常的处理过程和送货时间、送货地点的基础上估计得出的。您应当清楚准确地填写您的送货地址、联系人及联系方式等配送信息，
        您知悉并确认，您所购买的商品应仅由您填写的联系人接受身份查验后接收商品，因您变更联系人或相关配送信息而造成的损失由您自行承担。
      </p>
      <p>
        2. 因如下情况造成订单延迟或无法配送等，本软件将无法承担迟延配送的责任：
        （1）客户提供错误信息和不详细的地址；
        （2）货物送达无人签收，由此造成的重复配送所产生的费用及相关的后果。
        （3）不可抗力，例如：自然灾害、交通戒严、突发战争、海关政策变动、地区物流政策变动等。
      </p>
      <h3>五、用户个人信息保护及授权</h3>
      <p>
        1.
        您知悉并同意，为方便您使用本软件相关服务，本软件将存储您在使用时的必要信息，
        包括但不限于您的真实姓名、性别、生日、配送地址、联系方式、相册、日历、定位信息和您宠物的昵称、品种、生日、疫苗信息、存活情况等。
        除法律法规规定的情形外，未经您的许可E宠商城不会向第三方公开、透露您的个人信息。
      </p>
      <p>
        2.
        您知悉并确认，您在注册帐号或使用本软件的过程中，需要提供真实的身份信息，好伙伴宠物商城将根据国家法律法规相关要求，
        进行基于移动电话号码的真实身份信息认证。若您提供的信息不真实、不完整，则无法使用本软件或在使用过程中受到限制，
        同时，由此产生的不利后果，由您自行承担。
      </p>
      <p>
        3.
        您在使用本软件某一特定服务时，该服务可能会另有单独的协议、相关业务规则等（以下统称为“单独协议”），
        您在使用该项服务前请阅读并同意相关的单独协议；您使用前述特定服务，即视为您已阅读并同意接受相关单独协议。
      </p>
      <h3>六、违约责任</h3>
      <p>
        1.
        如果商城发现或收到他人举报投诉您违反本协议约定的，商城有权不经通知随时对相关内容进行删除、屏蔽，
        并视行为情节对违规帐号处以包括但不限于警告、限制或禁止使用部分或全部功能、帐号封禁直至注销的处罚，并公告处理结果。
      </p>
      <p>
        2.
        商城有权依据合理判断对违反有关法律法规或本协议规定的行为采取适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，
        您应独自承担由此而产生的一切法律责任。
      </p>
      <p>
        3.
        您理解并同意，因您违反本协议或相关服务条款的规定，导致或产生第三方主张的任何索赔、要求或损失，您应当独立承担责任；
        商城因此遭受损失的，您也应当一并赔偿。
      </p>
      <p>
        4.
        除非另有明确的书面说明,商城不对本软件的运营及其包含在本软件上的信息、内容、材料、产品（包括软件）或服务作任何形式的、
        明示或默示的声明或担保（根据中华人民共和国法律另有规定的以外）。
      </p>
      <h3>七、法律管辖适用及其他</h3>
      <p>
        1.
        本协议的订立、执行和解释及争议的解决均应适用中国法律。如双方就本协议内容或其执行发生任何争议，
        双方应尽力友好协商解决；协商不成时，任何一方均可向协议签订地人民法院提起诉讼。本协议签订地为中华人民共和国重庆市两江新区。
      </p>
      <p>
        2.
        如果本协议中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其余条款的有效性和可执行性。
      </p>
      <p>
        3.
        本协议未明示授权的其他权利仍由商城保留，您在行使这些权利时须另外取商城的书面许可。商城如果未行使前述任何权利，
        并不构成对该权利的放弃。
      </p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="agree">同意协议</el-button>
      </span>
    </template>
  </el-dialog>

  <Dialog
    :text="dialogText"
    :is-show="isShowDialog"
    @update-dialog="updateDialog"
  ></Dialog>
</template>

<script lang="ts" setup>
// @ts-ignore
// import { registerApi } from '@/apis/user.js'
// @ts-ignore
import { registerApi } from '@/api/user.js'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { rules } from '@/config/form-rules'
import { ElForm } from 'element-plus'
import Dialog from '@/components/dialog/dialog.vue'

const router = useRouter()

// 用户信息
const account = reactive({
  petName: '', // 账号
  petPwd: '', // 密码
})

const isAgree = ref(true)
const dialogVisible = ref(false)
const browseAgreement = () => {
  dialogVisible.value = true
}
// 同意用户协议
const agree = () => {
  dialogVisible.value = false
  isAgree.value = true
}

const isShowDialog = ref(false)
const dialogText = ref('')
const formRef = ref<InstanceType<typeof ElForm>>()
// 注册
const handleRegister = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 验证用户有没有同意用户协议
      if (isAgree.value) {
        registerApi(account).then((res: any) => {
          dialogText.value = res.data.message
          isShowDialog.value = true
        })
      } else {
        dialogText.value = '请先浏览并同意用户注册协议再进行注册'
        isShowDialog.value = true
      }
    }
  })
}

const updateDialog = (val: boolean) => {
  isShowDialog.value = val
}

// 去登录页
const toLogin = () => {
  router.push('/login')
}
</script>

<style lang="less" scoped>
@import '@/style/common.less';
.register-form {
  height: 500px;
  background-color: @basic-color;
  padding: 0 18%;
  .flex;
  .logo {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
  .form {
    width: 400px;
    height: 360px;
    padding: 0 40px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.482);
    box-shadow: 0 0 15px #ccc;
    border-radius: 20px;
    h2 {
      text-align: center;
      color: rgb(37, 88, 208);
      line-height: 80px;
    }
    .form-item {
      margin-bottom: 15px;
    }
    :deep(.el-form-item__content) {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      border: 1px solid @basic-color;
      position: relative;
      .iconfont {
        color: #ccc;
        margin-left: 5px;
      }
      .icon-mima {
        font-weight: bold;
        font-size: 22px;
      }
      .el-input {
        width: 90%;
      }
      .el-input__wrapper {
        border: 0 !important;
        box-shadow: none;
      }
      .el-form-item__error {
        position: absolute;
        left: 0;
        bottom: -17px;
        font-size: 13px;
        color: red;
      }
    }

    .agree {
      margin-top: 15px;
      span {
        color: red;
      }
    }
    .registerBtn {
      width: 100%;
      height: 40px;
      margin-top: 15px;
    }
    .toLogin {
      color: #fff;
      margin-top: 20px;
      text-align: right;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
        color: blue;
      }
    }
  }
}
.content {
  height: 450px;
  overflow-y: auto;
  padding-right: 20px;
  h2 {
    text-align: center;
  }
  h3 {
    line-height: 60px;
  }
  p {
    line-height: 27px;
    margin-bottom: 10px;
  }
}
:deep(.el-dialog__headerbtn .el-dialog__close) {
  display: none;
}
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 6px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: @basic-color !important;
}
:deep(.el-message-box__headerbtn .el-message-box__close) {
  display: none;
}
:deep(.el-message-box__content) {
  padding: 30px 0;
}
</style>
