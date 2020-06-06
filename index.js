const bodyParser = require('body-parser');
const express = require('express');

// http return codes
const NOT_FOUND = 404;
const SUCCESS = 200;
const INTERNAL_ERROR = 500;
const BAD_REQUEST = 400;

// TODO(minh): considering mutex to avoid read/write at the same blog post.
// It is not required in the homework.
// const { Mutex } = require('async-mutex');

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Initialize blogs in memory.
let blogs = {};

app.get('/api/post/:id', async (req, res) => {
  try {
    // Check the case where the post is not existed.
    if (!blogs[req.params.id]) {
      res.status(NOT_FOUND).json({
        status: 'failed',
        msg: `can not find blog post with id: ${req.params.id}`,
      });
      return;
    }

    // SUCCESS case.
    res.status(SUCCESS).json({
      status: 'success',
      msg: 'success',
      res: blogs[req.params.id],
    });
  } catch (err) {
    // Internal error.
    res.status(INTERNAL_ERROR).json({
      status: 'failed',
      msg: err.msg,
    });
  }
});

app.post('/api/post', async function (req, res) {
  try {
    // Extract data from body.
    let { id, author, title, content, date } = req.body;

    // Check if any field is undefined.
    if (
      id == undefined ||
      author == undefined ||
      title == undefined ||
      content == undefined ||
      date == undefined
    ) {
      res.status(BAD_REQUEST).json({
        status: 'failed',
        msg: 'undefined content on a field',
      });
      return;
    }

    // Check if a blog post is existed. Add and update is used
    // in the same endpoint as in the homework requirement.
    const msg = blogs[id]
      ? 'update an existing blog post'
      : 'add a new blog post';

    // Update blogs.
    blogs[id] = {
      id,
      author,
      title,
      content,
      date,
    };

    // SUCCESS case.
    res.status(SUCCESS).json({
      status: 'succes',
      msg,
      res: blogs[id],
    });
  } catch (err) {
    // Internal error.
    res.status(INTERNAL_ERROR).json({
      status: 'failed',
      msg: err.msg,
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Started on ${port}`));
