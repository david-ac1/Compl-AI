const https = require('http');

const payload = {
    object_kind: "merge_request",
    project: {
        id: 12345,
        name: "infrastructure-repo"
    },
    object_attributes: {
        iid: 125,
        title: "Update DB Region (Webhook Test)",
        description: "Moving database to US-East",
        state: "opened",
        source_branch: "feature/db-move",
        target_branch: "main",
        action: "open"
    },
    changes: {
        diff: `resource "aws_db_instance" "production" {
  identifier = "webhook-test-db"
- region = "af-south-1"
+ region = "us-east-1"
  engine = "postgres"
  storage_encrypted = false
}`
    }
};

const data = JSON.stringify(payload);

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/webhook/gitlab',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'X-Gitlab-Token': 'demo-secret'
    }
};

console.log('Sending webhook to http://localhost:3000/api/webhook/gitlab ...');

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');
    let body = '';
    res.on('data', (chunk) => { body += chunk; });
    res.on('end', () => { console.log(`BODY: ${body}`); });
});

req.on('error', (e) => {
    console.error(`Error: ${e.message}`);
    if (e.code === 'ECONNREFUSED') {
        console.error('-> Server not reachable. Make sure "npm run dev" is running first.');
    }
});

req.write(data);
req.end();
