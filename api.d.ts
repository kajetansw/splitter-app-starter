import { User, Action } from './types';

interface API {
  '/api/users/all': {
    GET: {}
  };
  '/api/user/:id': {
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
  '/api/user/:id/actions': {
    GET: {
      params: {
        id: string
      }
    }
  };
  '/api/user/:id/actions/by-date': {
    POST: {
      params: {
        id: string
      },
      body: { startDate: string, endDate: string }
    }
  };
  '/api/users': {
    POST: {
      body: User
    }
  };
  '/api/user/:id/statuses': {
    GET: {
      params: {
        id: string
      }
    }
  };
  '/api/user/:id/statuses/texts': {
    GET: {
      params: {
        id: string
      }
    }
  };
  '/api/user/:id/statuses/profitable': {
    GET: {
      params: {
        id: string
      }
    }
  };
  '/api/user': {
    POST: {
      body: User
    }
  };
  '/api/actions/all': {
    GET: {}
  };
  '/api/action/:id': {
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
  '/api/action': {
    POST: {
      body: Action
    }
  };
  '/api/statuses/all': {
    GET: {}
  };
  '/api/status/:id': {
    GET: {
      params: {
        id: string
      }
    }
  };
  '/api/login': {
    POST: {
      body: { email: string, password: string }
    }
  };
  '/api/register': {
    POST: {
      body: User
    }
  };
}
