(function(){
 
/*gradient*/
    const granimInstance = new Granim({
      element: '#granim-canvas',
      direction: 'left-right',
      isPausedWhenNotInView: false,
      states: {
        "default-state": {
          gradients: [
            ['#004080', '#0077b6', '#023e8a'],
            ['#0096c7', '#00b4d8', '#0077b6'],
            ['#023e8a', '#0096c7', '#004080'],
            ['#0077b6', '#48cae4', '#0096c7'],
          ],
          transitionSpeed: 5000,
        }
      }
    });

/*generate bubbles*/
const body = document.body;
for (let i=0; i<12; i++){
    const b = document.createElement('div');
    b.classList.add('bubble');
    const size = Math.random()*18+6;
    b.style.width = size + 'px';
    b.style.height = size + 'px';
    b.style.left = Math.random()*1180 + 'px';
    b.style.bottom = '-30px';
    b.style.animationDuration = (Math.random()* 8+6) + 's';
    b.style.animationDelay    = (Math.random() * 8) + 's';
    body.appendChild(b);
}

/*seaweed*/
const seaweedColors = ['#2ecc71','#27ae60','#1abc9c','#16a085'];
const seaweedPositions = [60, 150, 280, 420, 600, 750, 900, 1050, 1130, 1200, 1350];

seaweedPositions.forEach(function(x){
    const s = document.createElement('div');
    s.classList.add('seaweed');
    const h = Math.random()*150 + 80;
    s.style.left = x + 'px';
    s.style.height = h + 'px';
    s.style.width = '18px';
    s.style.background = seaweedColors[Math.floor(Math.random() * seaweedColors.length)];
    s.style.animationDelay = (Math.random() * 2) + 's';
    s.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
    document.body.appendChild(s);
})

/*p5.js*/
const countEl = document.getElementById('count');

new p5(function(p){
    let fish = [];
    let bubbles = [];

    class Fish{
        constructor(x,y){
            this.x = x || p.random(80, p.width - 80);
            this.y = y || p.random(100, p.height - 80);
            this.baseSpeed = p.random(1.2, 2.5);
            this.speedX = p.random([-1,1]) * this.baseSpeed;
            this.speedY = p.random(-0.8, 0.8);
            this.size = p.random(28, 60);
            this.fleeing = false;
            this.fleeRadius = 110;
            this.fleeSpeed  = p.random(5, 8);

            //fish color palette
             const palettes = [
            [p.color(255,120,50),  p.color(255,180,80)],
            [p.color(255,220,50),  p.color(255,150,0)],
            [p.color(100,220,255), p.color(0,150,200)],
            [p.color(255,100,150), p.color(200,50,100)],
            [p.color(150,255,150), p.color(50,180,80)],
            [p.color(200,150,255), p.color(120,50,200)],
            ];
            const pal = p.random(palettes);
            this.bodyCol = pal[0];
            this.finCol  = pal[1];
    
            this.wobble = p.random(1000);
        }

        move(){
            const d = p.dist(p.mouseX, p.mouseY, this.x, this.y);

            if(d < this.fleeRadius){
                this.fleeting = true;
                const angle = p.atan2(this.y - p.mouseY, this.x - p.mouseX);
                const targetSpeedX = p.cos(angle) * this.fleeSpeed;
                this.speedX = p.lerp(this.speedX, targetSpeedX, 0.25);
                this.speedY = p.lerp(this.speedY, targetSpeedY, 0.25);
            } else {
                this.fleeing = false;

                //gradually return to calm swimming
                const calmX = (this.speedX > 0 ? 1: -1)*this.baseSpeed;
                this.speedX = p.lerp(this.speedX, calmX, 0.03);
                this.speedY = p.lerp(this.speedY, p.sin(this.wobble * 0.02) * 0.8, 0.04);
            }
            this.wobble++;
            this.x += this.speedX;
            this.y += this.speedY;

            //wall bounce
            const pad = this.size * 0.6;

            if(this.x > p.width - pad){ this.x = p.width - pad; this.speedX *= -1; }
            if(this.x < pad) { this.x = pad; this.speedX *= -1;}
            if (this.y > p.height - pad){this.y = p.height -pad; this.speedY *= -1;}
            if(this.y < 90 + pad){this.y = 90 + pad; this.speedY *=-1;}

            //chance for bubbles to appear
            if (p.random() < 0.005){
                bubbles.push(new bubbles(this.x, this.y - this.size * 0.3));
            }
        }

        draw(){
            p.push();
            p.translate(this.x, this.y);
            if (this.speedX < 0) p.scale(-1, 1);

            p.noStroke();

            //tail
            p.fill(this.finCol);
            p.triangle(
                -this.size * 0.45, 0,
                -this.size * 0.85, -this.size * 0.35,
                -this.size * 0.85, this.size * 0.35
            );

            //pectoral fin
            p.fill(this.finCol);
            p.ellipse(0, this.size * 0.18, this.size * 0.35, this.size * 0.18);

            //body
            p.fill(this.fleeing ? p.color(255, 80,80):this.bodyCol);
            p.ellipse(0,0, this.size, this.size * 0.55);

            //eye white
            p.fill(255);
            p.circle(this.size * 0.22, -this.size * 0.06, this.size * 0.18);

            //pupil
            p.fill(20);
            p.circle(this.size*0.25, -this.size * 0.6, this.size * 0.09);

            //shine
            p.fill(255, 255, 255, 160);
            p.circle(this.size * 0.27, -this.size * 0.09, this.size * 0.04);

            p.pop();
        }
    }
    
    class Bubble {
        constructor(x,y){
            this.x = x + p.random(-10,10);
            this.y = y;
            this.size = p.random(4, 10);
            this.speed = p.random(0.8, 2);
            this.alpha = 180; 
            this.wobbleOffset = p.random(1000);
        }

        update(){
            this.y -= this.speed;
            this.x += p.sin(this.wobbleOffset * 0.05) * 0.5;
            this.wobbleOffset++;
            this.alpha -= 1.5;
        }

        draw(){
            p.noFill();
            p.stroke(255, 255, 255, this.alpha);
            p.strokeWeight(1);
            p.circle(this.x,this.y, this.size);
        }

        isDead(){
            return this.alpha <= 0 || this.y < 80;
    }

    setup = function(){
            const canvas = p.createCanvas(1200,750);
            canvas.parent('p5-container');
            canvas.style('display','block');
            canvas.style('background','transparent');
            p.clear();

            for(let i =0; i<10; i++) fish.push(new Fish());
            countEl.textContent = fish.length;
        };

        draw = function(){
            p.clear();

            //update + draw bubbles
            for (let i = bubbles.length - 1; i>=0; i--){
                bubbles[i].update();
                bubbles[i].draw();
                if (bubbles[i].isDead()) bubbles.splice(i,1);
            }
            for (const f of fish){
                f.move();
                f.draw();
            }
        }
    }
})

}());