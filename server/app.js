const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const { sequelize } = require('./models');
const indexRouter = require('./routes');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const authRouter = require('./routes/auth');
//const logoutRouter = require('routes/logout');

const app = express();
app.set('port', process.env.PORT || 3001);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.get('/api/hello', (req, res) => {
  res.send('안녕하세요.');
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/index', indexRouter);
app.use('/api/users/register', registerRouter);
app.use('/api/users/login', loginRouter);
app.use('/api/users/auth', authRouter);
//app.use('/api/users/logout', logoutRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

process.on('uncaughtException', function (err) {
  console.log(err);
});
/*const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key')
const { auth } = require('./middleware/auth')
const { User } = require('./models/User');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!~~새해 복 많이 받으세요'))

app.get('/api/hello', (req, res) =>{
  res.send("안녕하세요~")
})


app.post('/api/users/register', (req, res) => {
  // 회원가입할 때 필요한 정보들을 client에서 가져오면
  // 데이터 베이스에 넣어준다.
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})

//로그인API
app.post('/api/users/login', (req, res) => {

  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

      //비밀번호까지 맞다면 토큰을 생성하기
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        
        //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
          res.cookie("x_auth", user.token)
          .status(200)
          .json({loginSuccess: true, userId: user._id})
      })
    })
  })
})


app.get('/api/users/auth', auth, (req, res) => {

    //여기까지 미들웨어를 통과해 왔따는 얘기는 authentication이 true라는 말
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      //role 0 -> 일반유저 role 0이 아니면 관리자

      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image

    })
})
app.get('/api/users/logout', auth, (req, res) =>{

  User.findOneAndUpdate({_id:req.user._id}, 
    { token: ""}
    , (err, user) => {
      if(err) return res.json({ success: false, err});
      return res.status(200).send({
        sucess:true
      })
    })
})


const port = 5000
app.listen(port, () => console.log(`Example app listening on port ${port}`))

*/
