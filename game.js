const canv = document.querySelector('canvas')
const ctx = canv.getContext('2d')
const Highscorecard = document.

canv.width =innerWidth * 0.8;
canv.height = innerHeight * 0.8;

class Player{
  constructor(){
    this.vel ={
      x:0,
      y:0
    }
    const image =new Image()
    image.src='./gun.jpg'
    image.onload = ()=>{
      this.image =image;
      this.width = image.width*0.15
      this.height =image.height*0.6
      this.pos ={
        x:canv.width/2 - this.width/2,
        y:canv.height - 100
      }
    }

  }
    draw() {
      // ctx.fillStyle='blue'
      // ctx.fillRect(this.pos.x,this.pos.y, this.width,this.height)
      if(this.image){
      ctx.drawImage(this.image,this.pos.x,this.pos.y,this.width,this.height)
      }
    }
  
  move(){
    if(this.image){
    this.draw()
    this.pos.x+=this.vel.x;
    this.pos.y+=this.vel.y;
    }
  }
}


class Base{
  constructor(){
  this.pos={
  x: canv.width/2,
  y:canv.height/2
  }
  this.radius =40
}
draw(){
  ctx.beginPath()
  ctx.arc(this.pos.x,this.pos.y,this.radius,0,Math.PI*2)
  ctx.fillStyle='red'
  ctx.fill()
  ctx.closePath()
}
update(){
  this.draw()
}
}
class Bullet{
  constructor({pos,vel}){
      this.pos =pos
      this.vel =vel 
      this.radius =4
  }
  draw(){
    ctx.beginPath()
    ctx.arc(this.pos.x,this.pos.y,this.radius,0,Math.PI * 2)
    ctx.fillStyle ='yellow'
    ctx.fill()
    ctx.closePath()
  }
  shoot(){
    this.draw()
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y
  }
}
class enemyBullet{
  constructor({pos,vel}){
      this.pos =pos
      this.vel =vel 
      this.width =3
      this.height = 10
      
  }
  draw(){
    ctx.fillStyle='white'
   ctx.fillRect(this.pos.x,this.pos.y,this.width,this.height)
  }
  update(){
    this.draw()
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

  }
}
class Enemy{
  constructor(x,y,radius,color,vx,vy) {
    this.x =x
    this.y =y
    this.radius =radius
    this.color = color
    this.vx = vx
    this.vy = vy
    const image =new Image()
    image.src='./enemy.png'
    image.onload = ()=>{
      this.image =image;
      this.width = image.width*0.2
      this.height =image.height*0.2
  }
}
  draw(){
    if(this.image){
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
      }
  }
  update(){
    this.draw()
    this.x = this.x+ this.vx
    this.y = this.y + this.vy
  }

}
class Enemy2{
  constructor(x,y,radius,vx,vy){
    this.x =x
    this.y =y
    this.radius = radius
    this.vx= vx
    this.vy =vy

  }
  draw(){
    ctx.beginPath()
    ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2)
    ctx.fillStyle ='blue'
    ctx.fill()
    ctx.closePath()
  }
  update(){
    this.draw()
    this.x += this.vx
    this.y += this.vy
  }
  // enemyshoot(enemybullets){
  //   enemybullets.push(new enemyBullet({
  //     pos:{
  //       x:this.x + this.radius,
  //       y:this.y + this.radius
  //     },
  //     vel:{
  //       x: 0,
  //       y: 5
  //     }
  //   }))   }
} 
let gameover={
  over: false,
  active:false
}
const base = new Base()
const p =new Player() 
const bullets = []
const enemies =[]
const enemies1 =[]
const enemybullets=[]
function SpawnEnemies(){
  setInterval(() =>{
    
   const X = Math.random() *canv.width
   const Y= Math.random() * canv.height
  
    const radius =30
    const color= 'green'
    const angle= Math.atan2(
      canv.height/2 -Y, canv.width/2+20-X
    )
    const vx =Math.cos(angle)
    const vy =Math.sin(angle)

    enemies.push(new Enemy(X,Y,radius,color,vx,vy))   
  console.log(enemybullets)
     },3000)
}
function Enemyshooter(){
  setInterval(() =>{
    
    const X = 10
    const Y= 20
   
     const radius =10
    const vx =6
    const vy =0 
     
 
     enemies1.push(new Enemy2(X,Y,radius,vx,vy)) 
    
     enemies1.forEach((enemy)=> {
     
        enemybullets.push(new enemyBullet({
          pos:{
            x:enemy.x,
            y:enemy.y
          },
          vel:{
            x: 0,
            y: 4
          }
        }))
       enemybullets.forEach(enemybullet=>{
         enemybullet.update()
       }) 
         
       
       
   console.log(enemies1)
      })

},5000)
}
// function Shoot(){
//   setInterval(() =>{
//     enemybullets.forEach(enemybullet =>{
//       enemybullet.update()
//      })
//   },1000)
  
// }

const keys = {
  up:{
    pressed: false
  },
  down:{
    presed: false
  },
  left:{
    pressed: false
  },
  right:{
    pressed: false
  },
  space:{
    pressed: false
  }
}
let score=0;
let Highscore = localStorage.getItem("highscore") || 0;
Highscorecard.innerText =`High score : ${Highscore}`;

p.draw()
base.draw()
SpawnEnemies()
Enemyshooter()


function game(){
  requestAnimationFrame(game)
  ctx.fillStyle='black'
   ctx.fillRect(0,0,canv.width,canv.height)
  
  p.move()
  
  base.update()
  bullets.forEach((bullet,index) =>{
    if(bullet.pos.y + bullet.radius <=0){
      setTimeout(()=>{
        bullets.splice(index,1)
      },0)
      
    }else{
      bullet.shoot()
      
    }
  })
  enemies1.forEach(element => {
    element.update()
   
  });
  
  

  if( keys.up.pressed && p.pos.y>=0){
    p.vel.y = -7;
  }else if(keys.down.pressed && p.pos.y < canv.width){
    p.vel.y =7
  }else if(keys.left.pressed && p.pos.x>=0){
    p.vel.x =-7
  }else if(keys.right.pressed && p.pos.x < canv.width){
    p.vel.x =7
  }else{
    p.vel.x =0
    p.vel.y =0
  }
 enemies.forEach((enemy,index)=>{
   enemy.update()
   
   const dist1 = Math.hypot(p.pos.x - enemy.x , p.pos.y - enemy.y)
   if(dist1 == 0){
    cancelAnimationFrame(AnimationId)
    console.log("end")
  }
 bullets.forEach((bullet,ind) =>{
  const dist = Math.hypot(bullet.pos.x - enemy.x , bullet.pos.y - enemy.y)
  if(dist - bullet.radius -enemy.radius-10 <0){
    enemies.splice(index,1)
    bullets.splice(ind,1)
    score= score + 1;
  }
  
})
 
 })




}
game()
addEventListener('keydown',({key})=>{
   
   switch (key) {
    case 'ArrowUp':
      p.vel.y= -7
      keys.up.pressed =true
      break;
    case 'ArrowDown':
      p.vel.y = 7
      keys.down.pressed =true
      break;
    case 'ArrowLeft':
      p.vel.x = -7
      keys.left.pressed =true
      break;
          
    case 'ArrowRight':
      p.vel.x = 7;
      keys.right.pressed =true
       break;  
    case ' ':
      bullets.push(
        new Bullet({
          pos: {
            x:p.pos.x + p.width/2,
            y:p.pos.y
          },
          vel:{
            x:0,
            y:-10
          }
        })
      )
      break;           
    default:
      break;
   }
})
addEventListener('keyup',({key})=>{
   
  switch (key) {
   case 'ArrowUp':
     keys.up.pressed =false
     break;
   case 'ArrowDown':
     keys.down.pressed =false
     break;
   case 'ArrowLeft':
     keys.left.pressed =false
     break;
         
   case 'ArrowRight':
     keys.right.pressed =false
      break;  
   case ' ':
     break;           
   default:
     break;
  }
})