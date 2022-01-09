<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

/**
 * Exceptions will end here.
 */
class ErrorController extends AbstractController
{
    public function show(\Throwable $exception): Response
    {
        //return $this->json(['fatal' => sprintf('%s: %s [%s:%d]', $exception::class, $exception->getMessage(), basename($exception->getFile()), $exception->getLine())]);
        return $this->json(['fatal' => sprintf('%s: %s', $exception::class, $exception->getMessage())]);
    }
}
