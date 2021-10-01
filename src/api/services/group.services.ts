import { getRepository } from "typeorm";
import { Group } from "../../entities";
import { GroupInterface } from "../../types/group.type";

export const createGroup = async (group: GroupInterface) => {
  const groupRepository = getRepository(Group);

  const groupExists = await groupRepository.findOne({
    name: group.name,
  });

  if (groupExists) {
    return groupExists;
  }

  const group_ = new Group();
  group_.name = group.name;
  group_.scientific_name = group.scientific_name;

  return group_;
};
