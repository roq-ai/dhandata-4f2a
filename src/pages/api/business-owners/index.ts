import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { businessOwnerValidationSchema } from 'validationSchema/business-owners';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getBusinessOwners();
    case 'POST':
      return createBusinessOwner();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBusinessOwners() {
    const data = await prisma.business_owner
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'business_owner'));
    return res.status(200).json(data);
  }

  async function createBusinessOwner() {
    await businessOwnerValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.game?.length > 0) {
      const create_game = body.game;
      body.game = {
        create: create_game,
      };
    } else {
      delete body.game;
    }
    if (body?.team_member?.length > 0) {
      const create_team_member = body.team_member;
      body.team_member = {
        create: create_team_member,
      };
    } else {
      delete body.team_member;
    }
    const data = await prisma.business_owner.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
