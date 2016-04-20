/**
 * Created by pomy on 16/4/10.
 */

'use strict';

import './index.less';

import React, {Component} from 'react';

import {$,_} from '../../lib/base';

import Loading from '../../general/loading/index';

export default class BoleContent extends Component {

    constructor (){
        super ();
        this.state = {
            id: 2,
            url: 'http://top.jobbole.com/',
            fetching: true,
            postLists: [],
            text: ''
        };
    }

    componentWillMount (){
        fetch('/bole').then((response) => {
            return response.json();
        },(err)=>{
            console.log('error',err);
        }).then((json) => {
            this.setState({
                fetching: false,
                postLists: json.postLists
            });
        });
    }

    listener (originUrl){
        return (e) => {
            e.stopPropagation();
            this.props.open(originUrl);
        };
    }

    renderPostList () {
        let posts = [];
        let postId = -1;

        _.forEach(this.state.postLists, (list) => {
            let title = list.listTitle;
            let originUrl = list.listOriginUrl;
            let meta = list.listMeta;
            let avatarUrl = list.listAvatarUrl;
            let subjectUrl = list.listSubjectUrl;
            let subjectText = list.listSubjectText;

            posts.push(
                <div className="post" key={++postId} onClick={this.listener(originUrl)}>
                    <div className="content">
                        <h3 className="title">
                            <a target="_blank" href={originUrl}>{title}</a>
                        </h3>
                        <div className="meta">{meta}</div>
                    </div>
                    <div className="user-info">
                        <div className="user-avatar">
                            <img width="32" className="img-circle" src={avatarUrl} />
                        </div>
                    </div>
                    <div className="subject-name">来自 <a target="_blank" href={subjectUrl}>{subjectText}</a></div>
                </div>
            );
        });

        return posts;
    }

    render (){
        let isDisplay = Number(this.props.id) === this.state.id ? true : false;
        let bolePosts = this.renderPostList();

        if(this.state.fetching) {
            return (
                <div className="bole-contents" style={{display: isDisplay?'block':'none'}}>
                    <Loading/>
                </div>
            );
        }

        return (
            <div className="bole-contents" style={{display: isDisplay?'block':'none'}}>
                {bolePosts}
            </div>
        );
    }
}