/**
 * @author bh-lay
 * 
 * url  path + /user.html?userid=____
 */

var fs = require('fs');
var url = require('url');
var temp=fs.readFileSync('../web/admin/user/user.html', "utf8");
var querystring=require('querystring');

var user_group = {
	'admin' : '管理员',
	'editor' : '编辑',
	'test' : '测试',
};

function valueInit(data){
	var txt = temp.replace(/\{(user_group)}/g,function(){
		var user_group_tpl = '';
		for(var i in user_group){
			if(data['user_group']==i){
				user_group_tpl += '<option value="'+ i +'" selected="selected">' + user_group[i] + '</option>';
			}else{
				user_group_tpl += '<option value="'+ i +'">' + user_group[i] + '</option>';
			}
		}
		
		return user_group_tpl;
	}).replace(/\{(\w*)}/g,function(){
		return data[arguments[1]]||'';
	});
	return txt;
}
exports.render = function (req,res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	var search=url.parse(req.url).search;
	search&&(search=search.replace('?',''));
	var userID=querystring.parse(search).userid;
	if(userID){
		var mongo = require('../../../sys/conf/mongo_connect');
		mongo.open({'collection_name':'user'},function(err,collection,close){
			collection.find({'id':userID}).toArray(function(err, docs) {		
				var txt = valueInit(docs[0]);
				res.write(txt);
				res.end();
				close();
			});
		});
	}else{
		res.end(valueInit({}));
	}
}