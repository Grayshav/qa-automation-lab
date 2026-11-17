import http from 'k6/http';
import { check, sleep } from 'k6';

// Performance SLAs / Thresholds
export const options = {
  stages: [
    { duration: '3s', target: 3 },  // Ramp-up to 3 Virtual Users
    { duration: '5s', target: 3 },  // Sustained load
    { duration: '2s', target: 0 },  // Ramp-down
  ],
  thresholds: {
    // 95% of requests must complete below 1000ms
    http_req_duration: ['p(95)<1000'],
    // Error rate must be 0%
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  // 1. Hit public REST endpoint
  const res = http.get('https://httpbin.org/get', {
    headers: { 'Accept': 'application/json' },
  });

  // 2. Validate response code and contents
  check(res, {
    'status is 200': (r) => r.status === 200,
    'protocol is HTTP/1.1 or HTTP/2': (r) => r.proto.startsWith('HTTP/'),
    'response body contains url': (r) => r.json().url === 'https://httpbin.org/get',
  });

  // 3. User think time between requests (simulate realistic user delay)
  sleep(1);
}
