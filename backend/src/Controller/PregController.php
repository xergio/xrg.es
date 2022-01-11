<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\PregDTO;
use App\Service\Preg;
use Exception;
use Redis;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * PREGs controller.
 */
class PregController extends AbstractController
{
    private const STORE_KEY = 'xrg.es2022:%s';
    private const STORE_TTL = 60*60*24*7;

    #[Route('/api/preg', name: 'api_preg_post', methods: ["POST"])]
    public function index(Request $request, SerializerInterface $serializer, Redis $redis): Response
    {
        $dto = $serializer->deserialize($request->getContent(), PregDTO::class, 'json');

        if ($dto->pattern === '') {
            throw new Exception('Empty regular expression');
        }

        $preg = new Preg($dto);
        $result = $preg->exec();
        $key = $preg->getHash();

        $redis->setex(sprintf(self::STORE_KEY, $key), self::STORE_TTL, $serializer->serialize($dto, 'json'));

        return $this->json(array_merge((array)$result, ['hash' => $key]));
    }

    #[Route('/api/preg', name: 'api_preg_hash', methods: ["GET"])]
    public function hash(Request $request, Redis $redis): Response
    {
        $json = $redis->get(sprintf(self::STORE_KEY, $request->query->get('hash')));

        if ($json === false) {
            throw new NotFoundHttpException('Key not found.');
        }

        return JsonResponse::fromJsonString($json);
    }

    #[Route('/api/ppii', name: 'api_ppii', methods: ["GET"])]
    public function ppii(Request $request, Redis $redis): Response
    {
        ob_start();
        phpinfo();
        return new Response(ob_get_clean());
    }
}
