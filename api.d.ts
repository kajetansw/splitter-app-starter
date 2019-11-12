import { User, Action } from './types';

interface API {
  '/users/all': {
    GET: {}
  };
  '/user/:id': {
    GET: {
      params: {
        id: string
      }
    },
    DELETE: {
      params: {
        id: string
      }
    }
  };
  '/user/:id/actions': {
    GET: {
      params: {
        id: string
      }
    }
  };
  '/user/:id/actions/by-date': {
    POST: {
      params: {
        id: string
      },
      body: { startDate: string, endDate: string }
    }
  };
  '/users': {
    POST: {
      body: User
    }
  };
  '/user/:id/statuses': {
    GET: {
      params: {
        id: string
      }
    }
  };
  '/user/:id/statuses/texts': {
    GET: {
      params: {
        id: string
      }
    }
  };
  '/user/:id/statuses/profitable': {
    GET: {
      params: {
        id: string
      }
    }
  };
  '/user': {
    POST: {
      body: User
    }
  };
  '/actions/all': {
    GET: {}
  };
  '/action/:id': {
    GET: {
      params: {
        id: string
      }
    },
    DELETE: {
      params: {
        id: string
      }
    }
  };
  '/action': {
    POST: {
      body: Action
    }
  };
  '/statuses/all': {
    GET: {}
  };
  '/status/:id': {
    GET: {
      params: {
        id: string
      }
    }
  };
  '/login': {
    POST: {
      body: { email: string, password: string }
    }
  };
  '/register': {
    POST: {
      body: User
    }
  };
}
