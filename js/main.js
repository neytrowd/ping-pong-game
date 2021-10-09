class Game {
   constructor(data) {
      this.initElements(data);
      this.initSettings();
   }

   init() {
      this.moveReflectors(this.reflectRight, this.reflectLeft);
      this.start();
   }

   start() {
      document.addEventListener('keydown', (event) => {
         if (event.code == 'Space') this.actionBall();
      });
   }

   actionBall() {
      let direction = (Math.random() > 0.5) ? -1 : 1;
      let { reflectHeight, reflectWidth } = this;
      let { polyHeight, ballWidth, ballTopPosition, ballBottomPosition, ballLeftPosition } = this;
      let ballVerticalDirection = Math.random() * 5 + 5;
      let ballHorizontalDirection = (Math.random() * 5 + 5) * direction;

      clearInterval(this.id);

      this.id = window.setInterval(() => {
         if (ballTopPosition < 0 || ballTopPosition > polyHeight - ballWidth) {
            ballVerticalDirection = -ballVerticalDirection;
         }

         if (ballLeftPosition <= reflectWidth + this.reflectLeftPosLeft) {
            let conditionTop = ballBottomPosition > this.reflectLeftPosTop && ballBottomPosition < this.reflectLeftPosTop + reflectHeight;
            let condition = ballTopPosition > this.reflectLeftPosTop && ballTopPosition < this.reflectLeftPosTop + reflectHeight;
            if (condition || conditionTop) { ballHorizontalDirection = -ballHorizontalDirection; }
            else { clearInterval(this.id); this.scoreRight++; }
         }

         if (ballLeftPosition + ballWidth >= this.reflectRightPosLeft) {
            let conditionTop = ballBottomPosition > this.reflectRightPosTop && ballBottomPosition < this.reflectRightPosTop + reflectHeight;
            let condition = ballTopPosition > this.reflectRightPosTop && ballTopPosition < this.reflectRightPosTop + reflectHeight;
            if (condition || conditionTop) { ballHorizontalDirection = -ballHorizontalDirection; }
            else { clearInterval(this.id); this.scoreLeft++; }
         }

         ballTopPosition += ballVerticalDirection;
         ballBottomPosition += ballVerticalDirection;
         ballLeftPosition += ballHorizontalDirection;
         this.showResult(this.scoreRight, this.scoreLeft);
         this.setElementPosition(this.ball, ballTopPosition, ballLeftPosition);
      }, 35);

   }

   showResult(right, left) {
      this.resultRight.innerHTML = right;
      this.resultLeft.innerHTML = left;
   }

   moveReflectors(reflectRight, reflectLeft) {
      let { polyHeight, reflectHeight } = this;

      document.addEventListener('keydown', (event) => {
         if (event.code == 'ArrowDown' && polyHeight - reflectHeight > this.reflectRightPosTop) {
            this.reflectRightPosTop += 15;
         }
         else if (event.code == 'ArrowUp' && this.reflectRightPosTop > 0) {
            this.reflectRightPosTop -= 15;
         }

         if (event.code == 'KeyS' && polyHeight - reflectHeight > this.reflectLeftPosTop) {
            this.reflectLeftPosTop += 15;
         }
         else if (event.code == 'KeyW' && this.reflectLeftPosTop > 0) {
            this.reflectLeftPosTop -= 15;
         }

         this.setElementPosition(reflectRight, this.reflectRightPosTop);
         this.setElementPosition(reflectLeft, this.reflectLeftPosTop);
      });
   }

   setElementPosition(element, top, left) {
      element.style.top = `${top}px`;
      if (left != undefined) element.style.left = `${left}px`;
   }

   initSettings() {
      let ball = getComputedStyle(this.ball);
      let reflectLeft = getComputedStyle(this.reflectLeft);
      let reflectRight = getComputedStyle(this.reflectRight);

      this.scoreLeft = 0;
      this.scoreRight = 0;
      this.polyWidth = this.poly.clientWidth;
      this.polyHeight = this.poly.clientHeight;
      this.ballWidth = parseInt(ball.width);
      this.ballTopPosition = parseInt(ball.top);
      this.ballBottomPosition = parseInt(ball.bottom) + this.ballWidth;
      this.ballLeftPosition = parseInt(ball.left);
      this.reflectWidth = parseInt(reflectLeft.width);
      this.reflectHeight = parseInt(reflectLeft.height);
      this.reflectLeftPosTop = parseInt(reflectLeft.top);
      this.reflectLeftPosLeft = parseInt(reflectLeft.left);
      this.reflectRightPosTop = parseInt(reflectRight.top);
      this.reflectRightPosLeft = parseInt(reflectRight.left);
   }

   initElements(data) {
      this.poly = document.querySelector(`${data.poly}`);
      this.ball = this.poly.querySelector('#ball');
      this.resultRight = this.poly.querySelector('#resultRight');
      this.resultLeft = this.poly.querySelector('#resultLeft');
      this.reflectRight = this.poly.querySelector('#reflectRight');
      this.reflectLeft = this.poly.querySelector('#reflectLeft');
   }
}


new Game({
   poly: '#poly'
}).init();