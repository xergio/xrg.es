<?php

declare(strict_types=1);

namespace App\Entity;

use Exception;

/**
 * Data returned to web interface. Will be converted to JSON most likely.
 */
class PregResponse
{
    public function __construct(
        public readonly mixed $dump,
        public readonly string $code,
        public readonly ?string $returnType,
        public readonly ?string $returnValue,
    ) {
        if (preg_last_error() !== PREG_NO_ERROR) {
            throw new Exception('preg_last_error() = '. preg_last_error_msg());
        }
    }
}