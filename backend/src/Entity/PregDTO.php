<?php

declare(strict_types=1);

namespace App\Entity;

use App\Resource\Functions;

/**
 * Basic data comming from form.
 */
class PregDTO
{
    public function __construct(
        public readonly Functions $method,
        public readonly string $pattern,
        public readonly string $replacement,
        public readonly string $subject,
        public readonly bool $PREG_OFFSET_CAPTURE,
        public readonly bool $PREG_SET_ORDER,
        public readonly bool $PREG_SPLIT_DELIM_CAPTURE,
        public readonly bool $PREG_SPLIT_NO_EMPTY,
        public readonly bool $PREG_SPLIT_OFFSET_CAPTURE,
        public readonly bool $PREG_UNMATCHED_AS_NULL,
        public readonly ?int $offset,
        public readonly ?int $limit,
        public readonly ?string $delimiter
    ) {}
}