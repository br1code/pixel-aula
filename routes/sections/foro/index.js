'use strict';

const express                               = include('express'),
      moment                                = include('moment'),
      Topic                                 = include('models/topic'),
      Thread                                = include('models/thread'),
      Comment                               = include('models/comment');

const router = express.Router();

moment.locale('es');

router.get('/foro', (req, res) => {
    Topic.find({}, (err, topics) => {
        if (err) return res.redirect('/');
        res.render('./sections/foro', {topics, backUrl: '/'});
    });
});

router.get('/foro/nuevo', (req, res) => {
    res.render('./sections/foro/newTopic', {backUrl: '/foro'});
});

router.post('/foro/nuevo', (req, res) => {
    Topic.create(req.body.topic, (err, topic) => {
        if (err) return res.redirect('/foro/nuevo');

        // validate empty carrer
        if (!topic.carrer) {
            topic.carrer = 'Cualquier carrera';
            topic.save();
        }

        res.redirect('/foro/nuevo-exito');
    });
});

router.get('/foro/nuevo-exito', (req, res) => {
    res.render('./sections/foro/success', {backUrl: '/foro'});
});

router.get('/foro/:topicId', (req, res) => {
    Topic.findById(req.params.topicId)
        .populate('threads')
        .exec((err, topic) => {
            if (err || !topic) return res.redirect('/foro');
            res.render('./sections/foro/topic', {topic, backUrl: '/foro'});
        });
});

router.get('/foro/:topicId/nuevo', (req, res) => {
    let topicId = req.params.topicId;

    Topic.findById(topicId, (err, topic) => {
        if (err || !topic) return res.redirect('/foro');
        res.render('./sections/foro/newThread', {topic, backUrl: `/foro/${topicId}`});
    });
});

router.post('/foro/:topicId/nuevo', (req, res) => {
    let topicId = req.params.topicId;

    Topic.findById(topicId, (err, topic) => {
        if (err || !topic) return res.redirect('/foro/' + topicId + '/nuevo');
        
        Thread.create(req.body.thread, (err, thread) => {
            if (err) return res.redirect('/foro/' + topicId);

            // add extra data to the new thread and save
            thread.date = moment().format('ll');
            thread.save();

            // add new thread to the topic and save
            topic.threads.push(thread);
            topic.save();

            res.redirect('/foro/' + topicId + '/' + thread._id);
        });
    });
});

router.get('/foro/:topicId/:threadId', (req, res) => {
    let topicId = req.params.topicId;
    let threadId = req.params.threadId;

    Topic.findById(topicId, (err, topic) => {
        if (err || !topic) return res.redirect('/foro');

        Thread.findById(threadId)
            .populate('comments')
            .exec((err, thread) => {
                if (err || !thread) return res.redirect('/foro/' + topicId);
                res.render('./sections/foro/thread', {topic, thread, backUrl: `/foro/${topicId}`});
            });
    });
});

router.post('/foro/:topicId/:threadId/comentario', (req, res) => {
    let topicId = req.params.topicId;
    let threadId = req.params.threadId;

    Topic.findById(topicId, (err, topic) => {
        if (err || !topic) return res.redirect('/foro');

        Thread.findById(threadId, (err, thread) => {
            if (err || !thread) return res.redirect('/foro/' + topicId);

            Comment.create(req.body.comment, (err, comment) => {
                if (err) return res.redirect('/foro/' + topicId + '/' + threadId);

                // add extra data to the new comment and save
                comment.date = moment().format('ll');
                comment.color = selectRandomColor();
                comment.save();

                // add new comment to the thread and save
                thread.comments.push(comment);
                thread.save();

                res.redirect('/foro/' + topicId + '/' + threadId);
            });
        });
    });
});

function selectRandomColor() {
    let colors = ['#0E7C7B', '#D81E5B', '#E28413', '#6153CC', 
        '#E84855', '#AA4465', '#A755C2', '#21897E', '#540D6E'];
    return colors[Math.floor(Math.random() * colors.length)];
}

module.exports = router;