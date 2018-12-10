<template>
  <div id="mc-character">
    <div class="character turnAll turnHead">
      <div class="header-wrapper">
        <div class="head">
          <div class="head-top mc-bg"></div>
          <div class="head-front mc-bg"></div>
          <div class="head-left mc-bg"></div>
          <div class="head-right mc-bg"></div>
          <div class="head-back mc-bg"></div>
          <div class="head-bottom mc-bg"></div>
        </div>
      </div>
      <div class="torso">
        <div class="torso-top mc-bg"></div>
        <div class="torso-front mc-bg"></div>
        <div class="torso-left mc-bg"></div>
        <div class="torso-right mc-bg"></div>
        <div class="torso-back mc-bg"></div>
        <div class="torso-bottom mc-bg"></div>
      </div>
      <div class="left-arm">
        <div class="left-arm-top mc-bg"></div>
        <div class="left-arm-front mc-bg"></div>
        <div class="left-arm-left mc-bg"></div>
        <div class="left-arm-right mc-bg"></div>
        <div class="left-arm-back mc-bg"></div>
        <div class="left-arm-bottom mc-bg"></div>
      </div>
      <div class="right-arm">
        <div class="right-arm-top mc-bg"></div>
        <div class="right-arm-front mc-bg"></div>
        <div class="right-arm-left mc-bg"></div>
        <div class="right-arm-right mc-bg"></div>
        <div class="right-arm-back mc-bg"></div>
        <div class="right-arm-bottom mc-bg"></div>
      </div>
      <div class="legs-wrapper">
        <div class="left-leg">
          <div class="left-leg-top mc-bg"></div>
          <div class="left-leg-front mc-bg"></div>
          <div class="left-leg-left mc-bg"></div>
          <div class="left-leg-right mc-bg"></div>
          <div class="left-leg-back mc-bg"></div>
          <div class="left-leg-bottom mc-bg"></div>
        </div>
        <div class="right-leg">
          <div class="right-leg-top mc-bg"></div>
          <div class="right-leg-front mc-bg"></div>
          <div class="right-leg-left mc-bg"></div>
          <div class="right-leg-right mc-bg"></div>
          <div class="right-leg-back mc-bg"></div>
          <div class="right-leg-bottom mc-bg"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
#mc-character {
  height: 320px;
  left: 50%;
  margin-left: -160px;
  margin-top: -160px;
  position: absolute;
  transform-origin: 50% 50%;
  transform-style: preserve-3d;
  width: 320px;
  bottom: 0px;
  transform: scale(0.8, 0.8);
  // transform: rotateX(0) rotateY(0) rotateZ(0);
  .character {
    height: 320px;
    left: 0;
    position: absolute;
    top: 0;
    transform: scale(1) rotate3d(0, 0, 0, 45deg);
    transform-style: preserve-3d;
    width: 320px;

    // 身体移动
    &.move {
      .head {
        animation: HeadAnimation 1s infinite;
      }
      .left-arm {
        animation: Legs 1s infinite;
      }
      .right-arm {
        animation: LegsAlt 1s infinite;
      }
      .left-leg {
        animation: LegsAlt 1s infinite;
      }
      .right-leg {
        animation: Legs 1s infinite;
      }
    }
    // 转身
    &.turnAll {
      transform: rotateY(180deg);
    }

    // 前进

    // 开门

    // 转头
    &.turnHead {
      .head {
        transform: rotateY(120deg);
      }
      .torso {
        transform: rotateY(45deg);
      }
    }

    .header-wrapper {
      height: 80px;
      left: 120px;
      top: 0;
      transform-origin: bottom center;
      transform-style: preserve-3d;
      width: 80px;

      .head {
        height: 80px;
        left: 0px;
        top: 0;
        transform-style: preserve-3d;
        width: 80px;
        div {
          width: 80px;
          height: 80px;
        }
        .head-top {
          background-position: -80px 0px;
          transform: rotateX(90deg) translateZ(40px);
        }

        .head-front {
          background-position: -80px -80px;
          transform: rotateY(0deg) translateZ(40px);
        }

        .head-left {
          background-position: 0px -80px;
          transform: rotateY(-90deg) translateZ(40px);
        }
        .head-right {
          background-position: -160px -80px;
          transform: rotateY(90deg) translateZ(40px);
        }

        .head-back {
          background-position: -240px -80px;
          transform: rotateX(180deg) translateZ(40px) scaleY(-1);
        }
        .head-bottom {
          background-position: -160px 0px;
          transform: rotateX(-90deg) translateZ(40px);
        }
      }
    }

    .torso {
      height: 120px;
      left: 120px;
      top: 80px;
      transform-style: preserve-3d;
      width: 80px;
      div {
        width: 80px;
        height: 120px;
      }
      .torso-top {
        background-position: -200px -160px;
        height: 40px !important;

        transform: rotateX(90deg) translateZ(20px);
      }

      .torso-front {
        background-position: -200px -200px;

        transform: rotateY(0deg) translateZ(20px);
      }

      .torso-left {
        background-position: -160px -200px;
        width: 40px !important;

        transform: rotateY(-90deg) translateZ(20px);
      }
      .torso-right {
        background-position: -280px -200px;
        width: 40px !important;

        transform: rotateY(90deg) translateZ(60px);
      }

      .torso-back {
        background-position: -320px -200px;

        transform: rotateY(0deg) translateZ(-20px);
      }
      .torso-bottom {
        background-position: -280px -160px;
        height: 40px !important;

        transform: rotateX(-90deg) translateZ(100px);
      }
    }

    .left-arm,
    .right-arm,
    .right-leg,
    .left-leg {
      height: 120px;
      top: 80px;

      transform-origin: top center;

      transform-style: preserve-3d;
      width: 40px;
      div {
        width: 40px;
        height: 120px;
      }
    }

    .left-arm {
      left: 80px;
      .left-arm-top {
        background-position: -440px -160px;
        height: 40px !important;
        transform: rotateX(90deg) translateZ(20px);
      }

      .left-arm-front {
        background-position: -440px -200px;
        transform: rotateY(0deg) translateZ(20px);
      }

      .left-arm-left {
        background-position: -400px -200px;
        transform: rotateY(-90deg) translateZ(20px);
      }
      .left-arm-right {
        background-position: -480px -200px;
        transform: rotateY(90deg) translateZ(20px);
      }

      .left-arm-back {
        background-position: -520px -200px;
        transform: rotateY(0deg) translateZ(-20px) scaleX(-1);
      }
      .left-arm-bottom {
        background-position: -480px -160px;
        height: 40px !important;
        transform: rotateX(-90deg) translateZ(100px) scaleX(-1);
      }
    }

    .right-arm {
      left: 200px;

      .right-arm-top {
        background-position: -440px -160px;
        height: 40px !important;
        transform: rotateX(90deg) translateZ(20px) scaleX(-1);
      }

      .right-arm-front {
        background-position: -440px -200px;
        transform: rotateY(0deg) translateZ(20px) scaleX(-1);
      }

      .right-arm-left {
        background-position: -480px -200px;
        transform: rotateY(-90deg) translateZ(20px) scaleX(-1);
      }
      .right-arm-right {
        background-position: -400px -200px;
        transform: rotateY(90deg) translateZ(20px) scaleX(-1);
      }

      .right-arm-back {
        background-position: -520px -200px;
        transform: rotateY(0deg) translateZ(-20px);
      }
      .right-arm-bottom {
        background-position: -480px -160px;
        height: 40px !important;
        transform: rotateX(-90deg) translateZ(100px);
      }
    }

    .legs-wrapper {
      width: 80px;
      height: 120px;
      top: 200px;
      left: 120px;
      transform-style: preserve-3d;
      transform-origin: top center;
      .left-leg {
        left: 0;
        top: 0;
        .left-leg-top {
          background-position: -40px -160px;
          height: 40px !important;
          transform: rotateX(90deg) translateZ(20px);
        }
        .left-leg-front {
          background-position: -40px -200px;
          transform: rotateY(0deg) translateZ(20px);
        }
        .left-leg-left {
          background-position: 0px -200px;
          transform: rotateY(-90deg) translateZ(20px);
        }
        .left-leg-right {
          background-position: -80px -200px;
          transform: rotateY(90deg) translateZ(20px);
        }
        .left-leg-back {
          background-position: -120px -200px;
          transform: rotateY(0deg) translateZ(-20px) scaleX(-1);
        }
        .left-leg-bottom {
          background-position: -80px -160px;
          height: 40px !important;
          transform: rotateX(-90deg) translateZ(100px);
        }
      }
      .right-leg {
        left: 40px;
        top: 0;
        .right-leg-top {
          background-position: -40px -160px;
          height: 40px !important;
          transform: rotateX(90deg) translateZ(20px);
        }
        .right-leg-front {
          background-position: -40px -200px;
          transform: rotateY(0deg) translateZ(20px);
        }
        .right-leg-left {
          background-position: -80px -200px;
          transform: rotateY(-90deg) translateZ(20px) scaleX(-1);
        }
        .right-leg-right {
          background-position: 0px -200px;
          transform: rotateY(90deg) translateZ(20px) scaleX(-1);
        }
        .right-leg-back {
          background-position: -120px -200px;
          transform: rotateY(0deg) translateZ(-20px);
        }
        .right-leg-bottom {
          background-position: -80px -160px;
          height: 40px !important;
          transform: rotateX(-90deg) translateZ(100px);
        }
      }
    }
  }
  div {
    position: absolute;
  }
  .mc-bg {
    background: red;
    background-image: url("../../assets/mc-character.png");
  }

  @keyframes HeadAnimation {
    0% {
      transform: rotateY(2deg);
    }
    50% {
      transform: rotateY(-2deg);
    }
    100% {
      transform: rotateY(2deg);
    }
  }
  @keyframes Legs {
    0% {
      transform: rotateX(-30deg);
    }
    50% {
      transform: rotateX(30deg);
    }
    100% {
      transform: rotateX(-30deg);
    }
  }
  @keyframes LegsAlt {
    0% {
      transform: rotateX(30deg);
    }
    50% {
      transform: rotateX(-30deg);
    }
    100% {
      transform: rotateX(30deg);
    }
  }
}
</style>
