<template>
  <div class="edit-container">
    <!-- 工具栏区域 -->
    <div class="ed-toolBar-container">
      <div class="ed-toolBar"></div>
    </div>
    <div class="edit-area">
      <!-- 组件列表框 -->
      <div class="component-list-container"></div>
      <!-- 画布区域 -->
      <div class="canvas-container">
        <div class="canvas-area">
          <!-- 画布大小由用户决定，此处用动态样式。我先默认随便用个宽高了 -->
          <div class="canvas"
             @drop="handledrop($event)"

             >
            <!-- 拖拽功能实现 -->

            <div id="test" @mousedown="handleMouseDown($event)">
              test
            </div>


          </div>
        </div>
      </div>
      <!-- 属性列表框 -->
      <div class="property-list-container">

        <!-- 组件拖拽 -->
        <div class="test2"
          draggable="true"
          @dragstart="handledragstart($event)"
          >
          test2
        </div>
          <v-button :propValue="burl"
            
          ></v-button>
        <!-- 属性列表 -->
      </div>
    </div>
  </div>
</template>

<script>
import vButton from '../../components/component/v-button.vue';
export default {
  name: "editPage",
  data(){
    return{
      /////////////////////////////
      components: [],//放入画布的元素
      c_index: 0,//放入画布元素个数
      d_flag: 0, //判断是否能添加元素
      d_indexX: 0, //拖拽元素偏移量
      d_indexY: 0,
      ////////////////////////////
      burl:"按钮",
    }
  },
  components:{
    vButton,
  },
  methods:{
    //元素拖拽入画布
      //开始拖拽
    handledragstart(e){

      this.d_flag=1;//可添加
      console.log("asdf");
      //获取鼠标在图标上位置，得到偏移量
      this.d_indexX=e.clientX-e.target.offsetLeft;
      this.d_indexY=e.clientY-e.target.offsetTop;
    },
    handledrop(e){
      if(this.d_flag){ //进行判断，仅组件库拖动才可进入实现元素添加
        this.d_flag=0;
        console.log("asd");
        e.preventDefault()
        e.stopPropagation()

        var div1 = document.createElement('button');
        var canvas_a=document.querySelector('.canvas-area');
        var canvas=document.querySelector('.canvas');

        div1.style.backgroundColor="pink";
        div1.style.width="50px";
        div1.style.height="50px";
        div1.style.position="absolute";

        //将元素放到指定位置
        div1.style.left=e.clientX-canvas_a.offsetLeft-this.d_indexX+'px';
        div1.style.top=e.clientY-canvas_a.offsetTop-this.d_indexY+'px';
        canvas.appendChild(div1);

        this.components[this.c_index++]=div1;//将拖入元素放入数组存储

        //添加事件，实现移动
        div1.addEventListener("mousedown", function(e){
          const startY = e.clientY
          const startX = e.clientX
          var el=e.currentTarget;
          var startLeft=el.offsetLeft;
          var startTop=el.offsetTop;

          const move = (moveEvent) => {
            const currX = moveEvent.clientX;
            const currY = moveEvent.clientY;
            el.style.top = currY - startY + startTop+'px';
            el.style.left = currX - startX + startLeft+'px';
          }
          const up = () => {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', up);
          }
          document.addEventListener('mousemove', move);
          document.addEventListener('mouseup', up);
          
        });
      }
    },
    // 画布上移动
    handleMouseDown(e){

      e.preventDefault()
      e.stopPropagation()

      const startY = e.clientY
      const startX = e.clientX
      var el=e.currentTarget;
      var startLeft=el.offsetLeft;
      var startTop=el.offsetTop;

      //拖动
      const move = (moveEvent) => {
        const currX = moveEvent.clientX;
        const currY = moveEvent.clientY;
        el.style.top = currY - startY + startTop+'px';
        el.style.left = currX - startX + startLeft+'px';
      }
      //拖动结束
      const up = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      }
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "./index.less";
</style>
