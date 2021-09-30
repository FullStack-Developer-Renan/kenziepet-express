import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { getRepository } from "typeorm";
import { User } from "../../entities";

export default (): Strategy => {
  const options: StrategyOptions = {
    secretOrKey: "xpto",
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  const verify = async (jwt_payload: any, done: Function) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(jwt_payload.id);

    done(null, user ? user : false);
  };

  return new Strategy(options, verify);
};
