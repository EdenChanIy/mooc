import user from '../../../common/user.jpg'
import courseImg from '../../../common/course.png'

const COURSE = {
  id: 0,
  img: courseImg,
  name: 'Unity5.x 创造 3D VR游戏',
  subtitle: '零基础入门游戏行业',
  category1: {
    id: 8,
    name: '移动开发'
  },
  category2: {
    id: 9,
    name: 'Android开发'
  },
  needToKnow: '1.前端基础知识的HTML，Javascript, css\n' +
    '2.适合于前端小白，想了解最流行的前端框架的小伙伴。\n' +
    '3.有基础的前端/后台人员，想提高工作效率，扩展前端框架的应用的人',
  gains: '1. vue常用模板语法\n' +
    '2. 列表渲染、条件渲染\n' +
    '3. Class与style绑定\n' +
    '4. vue事件绑定与处理\n' +
    '5. vue计算属性computed, watch\n' +
    '6. vue-cli快速创建工程\n' +
    '7. vue的组件思想，代码规范\n' +
    '8. vue-router介绍\n' +
    '9. 认识vuex，组件间的通信方式\n' +
    '10. 前端调试方法，vue组件调试方法',
  lector: {
    id: 123,
    name: '张三',
    icon: user,
    job: 'android开发工程师'
  },
  totalTime: 8100,
  learningCount: 2200,
  rating: 4.8,
  favorite: true,
  leavePosition: {
    sid: 1,
    name: '课时名称',
    time: '离开时学到课时的时间点'
  }
}

const CATALOG = {
  intro: '通过本课程，大家可以了解vue2.x的核心技术，建立前端组件化的思想，包括：常用的vue语法，vue-router，vuex，vue-cli等。我会手把手带大家使用vue-cli工具，快速构建vue项目。认识项目目录的同时，学会如何集成vue2.x到已有项目中，以及调试vue组件。从理论到实践，从小白到熟悉应用，我们配合实际的多案例共同进步。',
  catalog: [
    {
      id: 1,
      title: '章节1',
      intro: '章节介绍1',
      sessions: [
        {
          id: 1,
          title: '课时标题1',
          url: '#',
          time: 123,
          finish: 0,
          leaveTime: 50,
          nodes: [
            {
              name: '节点名',
              time: 60
            }
          ]
        },
        {
          id: 2,
          title: '课时标题2',
          url: '#',
          time: 123,
          leaveTime: 50,
          finish: 1,
          nodes: [
            {
              name: '节点名',
              time: 60
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: '章节2',
      intro: '章节介绍2',
      sessions: [
        {
          id: 1,
          title: '课时标题1',
          url: '#',
          time: 123,
          leaveTime: 50,
          finish: 2,
          nodes: [
            {
              name: '节点名',
              time: 60
            }
          ]
        }
      ]
    }
  ]
}

export { COURSE, CATALOG }
