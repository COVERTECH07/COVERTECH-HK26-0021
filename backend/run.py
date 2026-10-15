import os

import uvicorn


if __name__ == '__main__':
    port = int(os.getenv('PORT', '8000'))
    reload = os.getenv('ENVIRONMENT', 'development').lower() != 'production'
    uvicorn.run('app.main:app', host='0.0.0.0', port=port, reload=reload)
