# 1. 클라이언트 상태 vs 서버 상태

- **클라이언트 상태:** 웹 브라우저 세션과 관련된 모든 정보
  - 예시: 사용자가 선택한 언어 또는 테마
- **서버 상태:** 서버에 저장되지만 클라이언트에 표시하는 데 필요한 데이터
  - 예시: 데이터베이스에 저장하는 블로그 게시물 데이터

&nbsp;

# 2. TanStack Query가 해결하고자 하는 문제

![TanStack Query가 해결하고자 하는 문제](/images/what-problem-does-tanstack-query-solve.png)

- TanStack Query는 클라이언트에서 **서버 데이터 캐시를 관리**
- React 코드에 서버 데이터가 필요할 때 `fetch`나 [Axios](https://axios-http.com/kr/docs/intro)를 사용해 서버로 바로 이동하지 않고 **TanStack Query 캐시를 요청**
- TanStack Query의 역할은 TanStack Query 클라이언트를 어떻게 구성했느냐에 따라 해당 **캐시의 데이터를 유지/관리하는 것**

&nbsp;

# 3. TanStack Query는 데이터를 관리합니다.

- 데이터를 관리하는 것은 TanStack Query이지만 서버의 새 데이터로 캐시를 업데이트하는 시기를 설정하는 것은 사용자의 몫

```json
{
  "key": ["blog-posts"], // key: 데이터가 식별되는 방식
  "data": [
    {
      "title": "TanStack Query",
      "tagLine": "What is this thing?"
    },
    {
      "title": "TanStack Query Mutations",
      "tagLine": "Not just for ninja turtles"
    }
  ],
  "staleTime": "30 seconds"
}
```

- 클라이언트 캐시에 있는 데이터가 서버의 데이터와 일치하는지 확인하는 방법
  1. **명령형:** 쿼리 클라이언트에 이 데이터를 무효화하고 캐시에 교체할 새 데이터를 서버에서 가져오게 지시하는 것
  2. **선언형:** `staleTime` 등을 활용해 `refetch`를 트리거하는 조건을 구성하는 것

&nbsp;

# 4. 더 나아가서...

1. 서버에 대한 모든 쿼리의 **로딩 및 오류 상태를 유지**해주기 때문에 수동으로 할 필요가 없어진다.
2. 사용자를 위해 데이터의 페이지네이션 또는 무한 스크롤이 필요한 경우 **데이터를 조각으로 가져올 수 있는 도구**도 제공한다.
3. 사용자가 데이터를 언제 필요로 할지 예상하여 **prefetch**를 수행할 수 있다.
4. TanStack Query가 서버에서 **데이터의 변이(Mutation)나 업데이트를 관리**할 수 있다.
5. 쿼리는 키로 식별되기 때문에 TanStack Query는 **요청을 관리**할 수 있다.
   - 페이지를 로드하고 해당 페이지의 여러 구성 요소가 동일한 데이터를 요청하는 경우 TanStack Query는 쿼리를 한 번에 보낼 수 있다.
   - 기존 쿼리가 요청되는 동안 다른 구성 요소가 데이터를 요청하는 경우 TanStack Query는 **중복 요청을 제거**할 수 있다.
6. 서버에서 오류가 발생하는 경우에 대한 **재시도를 관리**할 수 있다.
   - TanStack Query는 기본적으로 **세 번 시도** 후 데이터를 가져올 수 없다고 판단
7. 쿼리가 성공하거나 오류가 났을 때를 구별해서 조치를 취할 수 있도록 **콜백을 전달**할 수 있다.

# 5. isFetching vs isLoading

- `isFetching`
  - 비동기 쿼리가 아직 이행되지 않음.
- `isLoading`
  - `isFetching`의 하위 집합
  - 캐시된 데이터 X + `isFetching`

# 6. TanStack Query Devtools

- 쿼리 키 별 쿼리
  - 모든 쿼리의 상태
    - 활성, 비활성, 오래됨(stale) 등
  - 마지막으로 업데이트된 시간
- 데이터 탐색기
- 쿼리 탐색기

- 개발자 도구는 Production 환경에는 포함되지 않는다.
