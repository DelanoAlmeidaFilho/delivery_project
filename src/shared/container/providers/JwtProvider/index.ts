import { container } from 'tsyringe';
import { IJwtProvider } from './IJwtProvider';
import { JwtProvider } from './implementations/JwtProvider';

container.registerSingleton<IJwtProvider>('JwtProvider', JwtProvider);
